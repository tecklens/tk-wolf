import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as passport from 'passport';
import { RolesGuard } from '@fw/roles.guard';
import { SubscriberRouteGuard } from '@fw/subscriber-route.guard';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import {
  apiVersion,
  appDesc,
  appName,
  appVersion,
  contextPath,
  port,
} from '@config/env';
import PluginManager from '@pak/plugin-manager';

// * init plugins
const manager = new PluginManager(__dirname);

manager.registerPlugin({
  name: 'uppercase-plugin',
  packageName: '../plugins/uppercase',
  isRelative: true,
});

// * -------------------------------------------------------------------------------------

const corsOptionsDelegate = function (req, callback) {
  const corsOptions = {
    origin: false as boolean | string | string[],
    preflightContinue: false,
    maxAge: 86400,
    allowedHeaders: ['Content-Type', 'Authorization', 'sentry-trace'],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  };

  if (
    ['dev', 'test', 'local'].includes(process.env.NODE_ENV) ||
    isWidgetRoute(req.url) ||
    isBlueprintRoute(req.url)
  ) {
    corsOptions.origin = '*';
  } else {
    corsOptions.origin = [process.env.FRONT_BASE_URL];
    if (process.env.WIDGET_BASE_URL) {
      corsOptions.origin.push(process.env.WIDGET_BASE_URL);
    }
  }
  callback(null, corsOptions);
};

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * swagger
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDesc)
    .setVersion(appVersion)
    .addTag('Events')
    .addTag('Subscribers')
    .addTag('Topics')
    .addTag('Notification')
    .addTag('Integrations')
    .addTag('Layouts')
    .addTag('Workflows')
    .addTag('Notification Templates')
    .addTag('Workflow groups')
    .addTag('Changes')
    .addTag('Environments')
    .addTag('Inbound Parse')
    .addTag('Feeds')
    .addTag('Tenants')
    .addTag('Messages')
    .addTag('Organizations')
    .addTag('Execution Details')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const extendedBodySizeRoutes = [
    apiVersion + '/events',
    apiVersion + '/notification-templates',
    apiVersion + '/workflows',
    apiVersion + '/layouts',
  ];

  // * cors
  app.use(helmet());
  app.enableCors(corsOptionsDelegate);

  // * context path
  app.setGlobalPrefix(contextPath + apiVersion);

  app.use(passport.initialize());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  app.useGlobalGuards(new SubscriberRouteGuard(app.get(Reflector)));

  app.use(extendedBodySizeRoutes, bodyParser.json({ limit: '20mb' }));
  app.use(
    extendedBodySizeRoutes,
    bodyParser.urlencoded({ limit: '20mb', extended: true }),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(compression());

  Logger.log('BOOTSTRAPPED SUCCESSFULLY');

  await app.listen(port);
  Logger.log(`Starting UserApplication using Nestjs 10.0.0 on port: ${port}`);
}

function isWidgetRoute(url: string) {
  return url.startsWith('/v1/widgets');
}

function isBlueprintRoute(url: string) {
  return url.startsWith('/v1/blueprints');
}
