import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@app/ws-adapter';

declare const module: any;

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
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: false,
  });

  const configService = app.get(ConfigService);

  const apiVersion = configService.get('API_VERSION');
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
  app.setGlobalPrefix(configService.get('CONTEXT_PATH') + apiVersion);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  // app.useGlobalGuards(new RolesGuard(app.get(Reflector)));
  // app.useGlobalGuards(new SubscriberRouteGuard(app.get(Reflector)));

  app.use(
    bodyParser.json({
      limit: '20mb',
      verify: (req: any, res, buf) => {
        const url = req.originalUrl;
        if (url.includes('/stripe/webhook')) {
          req.rawBody = buf.toString();
        }
      },
    }),
  );

  app.use(compression());

  app.useWebSocketAdapter(new WsAdapter(app));

  app.enableShutdownHooks();

  await app.init();

  Logger.log('BOOTSTRAPPED SUCCESSFULLY');

  // * swagger
  const config = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription(configService.get('APP_DESCRIPTION'))
    .setVersion(configService.get('APP_VERSION'))
    .addTag('Auth')
    .addBearerAuth()
    .setBasePath(configService.get('CONTEXT_PATH') + apiVersion)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT');
  await app.listen(port);
  Logger.log(`Starting UserApplication using Nestjs 10.0.0 on port: ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

function isWidgetRoute(url: string) {
  return url.startsWith('/v1/widgets');
}

function isBlueprintRoute(url: string) {
  return url.startsWith('/v1/blueprints');
}
