import { Injectable, Logger } from '@nestjs/common';
import { setTimeout } from 'timers/promises';

import {
  getClientAndConfig,
  getClientAndConfigForCluster,
  InMemoryProviderConfig,
} from './providers';
import {
  Cluster,
  ClusterOptions,
  InMemoryProviderClient,
  InMemoryProviderEnum,
  Redis,
  RedisOptions,
  ScanStream,
} from './types';

const LOG_CONTEXT = 'InMemoryProviderService';

export class InMemoryProviderService {
  public inMemoryProviderClient: InMemoryProviderClient;
  public inMemoryProviderConfig: InMemoryProviderConfig;

  public isProviderClientReady: (string) => boolean;

  constructor(
    private provider: InMemoryProviderEnum,
    private isCluster: boolean,
    private enableAutoPipelining?: boolean
  ) {
    Logger.log(
      this.descriptiveLogMessage('In-memory provider service initialized'),
      LOG_CONTEXT
    );
    this.inMemoryProviderClient = this.buildClient(provider);
  }

  public get getProvider(): {
    selected: InMemoryProviderEnum;
    configured: InMemoryProviderEnum;
  } {
    const config = this.isCluster
      ? getClientAndConfigForCluster(this.provider)
      : getClientAndConfig();

    return {
      selected: this.provider,
      configured: config.provider,
    };
  }

  protected descriptiveLogMessage(message) {
    return `[Provider: ${this.provider}] ${message}`;
  }

  private buildClient(provider: InMemoryProviderEnum): InMemoryProviderClient {
    // TODO: Temporary while migrating to MemoryDB
    if (provider === InMemoryProviderEnum.OLD_INSTANCE_REDIS) {
      return this.oldInstanceInMemoryProviderSetup();
    }

    return this.isCluster
      ? this.inMemoryClusterProviderSetup(provider)
      : this.inMemoryProviderSetup();
  }

  public async delayUntilReadiness(): Promise<void> {
    let times = 0;
    const retries = process.env
      .IN_MEMORY_PROVIDER_SERVICE_READINESS_TIMEOUT_RETRIES
      ? Number(process.env.IN_MEMORY_PROVIDER_SERVICE_READINESS_TIMEOUT_RETRIES)
      : 10;
    const timeout = process.env.IN_MEMORY_PROVIDER_SERVICE_READINESS_TIMEOUT
      ? Number(process.env.IN_MEMORY_PROVIDER_SERVICE_READINESS_TIMEOUT)
      : 100;

    while (times <= retries && !this.isClientReady()) {
      times += 1;
      await setTimeout(timeout);
    }

    Logger.warn(
      this.descriptiveLogMessage(
        `Is being delayed ${times} times up to a total of ${retries}.`
      ),
      LOG_CONTEXT
    );

    if (times === retries) {
      Logger.error(
        this.descriptiveLogMessage(
          'It reached the limit of retries waiting for readiness.'
        ),
        LOG_CONTEXT
      );
    }
  }

  public getStatus(): string | unknown {
    if (this.inMemoryProviderClient) {
      return this.inMemoryProviderClient.status;
    }
  }

  public isClientReady(): boolean {
    return this.isProviderClientReady(this.getStatus());
  }

  public getClusterOptions(): ClusterOptions | undefined {
    if (this.inMemoryProviderClient && this.isCluster) {
      return this.inMemoryProviderClient.options;
    }
  }

  public getOptions(): RedisOptions | undefined {
    if (this.inMemoryProviderClient) {
      if (
        this.provider === InMemoryProviderEnum.OLD_INSTANCE_REDIS ||
        !this.isCluster
      ) {
        const options: RedisOptions = this.inMemoryProviderClient.options;

        return options;
      } else {
        const clusterOptions: ClusterOptions =
          this.inMemoryProviderClient.options;

        return clusterOptions.redisOptions;
      }
    }
  }

  private inMemoryClusterProviderSetup(provider): Cluster | undefined {
    Logger.verbose(
      this.descriptiveLogMessage(`In-memory cluster service set up`),
      LOG_CONTEXT
    );

    const { getConfig, getClient, isClientReady } =
      getClientAndConfigForCluster(provider);

    this.isProviderClientReady = isClientReady;
    this.inMemoryProviderConfig = getConfig();
    const { host, ttl } = getConfig();

    if (!host) {
      Logger.warn(
        this.descriptiveLogMessage(`Missing host for in-memory cluster for`),
        LOG_CONTEXT
      );
    }

    const inMemoryProviderClient = getClient(this.enableAutoPipelining);
    if (host && inMemoryProviderClient) {
      Logger.log(
        this.descriptiveLogMessage(`Connecting to cluster at ${host}`),
        LOG_CONTEXT
      );

      inMemoryProviderClient.on('connect', () => {
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory cluster connected`),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('connecting', () => {
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory cluster connecting`),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('reconnecting', () => {
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory cluster reconnecting`),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('close', () => {
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory cluster closing`),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('end', () => {
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory cluster end`),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('error', (error) => {
        Logger.error(
          error,
          this.descriptiveLogMessage(
            `There has been an error in the In-memory Cluster provider client`
          ),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('ready', () => {
        Logger.log(
          this.descriptiveLogMessage(`In-memory cluster ready`),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('wait', () => {
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory cluster waiting`),
          LOG_CONTEXT
        );
      });

      return inMemoryProviderClient;
    }
  }

  private inMemoryProviderSetup(): Redis | undefined {
    Logger.verbose(
      this.descriptiveLogMessage('In-memory service set up'),
      LOG_CONTEXT
    );

    const { getClient, getConfig, isClientReady } = getClientAndConfig();

    this.isProviderClientReady = isClientReady;
    this.inMemoryProviderConfig = getConfig();
    const { host, port, ttl } = getConfig();

    if (!host) {
      Logger.warn(
        this.descriptiveLogMessage('Missing host for in-memory provider'),
        LOG_CONTEXT
      );
    }

    const inMemoryProviderClient = getClient();
    if (host && inMemoryProviderClient) {
      Logger.log(
        this.descriptiveLogMessage(`Connecting to ${host}:${port}`),
        LOG_CONTEXT
      );

      inMemoryProviderClient.on('connect', () => {
        Logger.verbose(
          this.descriptiveLogMessage('REDIS CONNECTED'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('reconnecting', () => {
        Logger.verbose(
          this.descriptiveLogMessage('Redis reconnecting'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('close', () => {
        Logger.verbose(this.descriptiveLogMessage('Redis close'), LOG_CONTEXT);
      });

      inMemoryProviderClient.on('end', () => {
        Logger.verbose(this.descriptiveLogMessage('Redis end'), LOG_CONTEXT);
      });

      inMemoryProviderClient.on('error', (error) => {
        Logger.error(
          error,
          this.descriptiveLogMessage(
            'There has been an error in the InMemory provider client'
          ),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('ready', () => {
        Logger.log(this.descriptiveLogMessage('Redis ready'), LOG_CONTEXT);
      });

      inMemoryProviderClient.on('wait', () => {
        Logger.verbose(this.descriptiveLogMessage('Redis wait'), LOG_CONTEXT);
      });

      return inMemoryProviderClient;
    }
  }

  /**
   * TODO: Temporary while we migrate to MemoryDB
   */
  private oldInstanceInMemoryProviderSetup(): Redis | undefined {
    Logger.verbose(
      this.descriptiveLogMessage('In-memory old instance service set up'),
      LOG_CONTEXT
    );

    const { getClient, getConfig, isClientReady } = getClientAndConfig();

    this.isProviderClientReady = isClientReady;
    this.inMemoryProviderConfig = getConfig();
    const { host, port, ttl } = getConfig();

    if (!host) {
      Logger.warn(
        this.descriptiveLogMessage(
          'Missing host for in-memory provider old instance'
        ),
        LOG_CONTEXT
      );
    }

    const inMemoryProviderClient = getClient();
    if (host && inMemoryProviderClient) {
      Logger.log(
        this.descriptiveLogMessage(
          `Connecting to old instance to ${host}:${port}`
        ),
        LOG_CONTEXT
      );

      inMemoryProviderClient.on('connect', () => {
        Logger.log(
          this.descriptiveLogMessage('REDIS CONNECTED to old instance'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('reconnecting', () => {
        Logger.verbose(
          this.descriptiveLogMessage('Redis reconnecting to old instance'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('close', () => {
        Logger.verbose(
          this.descriptiveLogMessage('Redis close old instance'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('end', () => {
        Logger.verbose(
          this.descriptiveLogMessage('Redis end old instance'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('error', (error) => {
        Logger.error(
          error,
          this.descriptiveLogMessage(
            'There has been an error in the InMemory provider client for the old instance'
          ),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('ready', () => {
        Logger.log(
          this.descriptiveLogMessage('Redis ready for old instance'),
          LOG_CONTEXT
        );
      });

      inMemoryProviderClient.on('wait', () => {
        Logger.verbose(
          this.descriptiveLogMessage('Redis wait for old instance'),
          LOG_CONTEXT
        );
      });

      return inMemoryProviderClient;
    }
  }

  public inMemoryScan(pattern: string): ScanStream {
    if (this.isCluster) {
      const client = this.inMemoryProviderClient as Cluster;

      return client.sscanStream(pattern);
    }

    const client = this.inMemoryProviderClient as Redis;

    return client.scanStream({ match: pattern });
  }

  public async shutdown(): Promise<void> {
    if (this.inMemoryProviderClient) {
      try {
        await this.inMemoryProviderClient.quit();
        Logger.verbose(
          this.descriptiveLogMessage(`In-memory provider service shutdown`),
          LOG_CONTEXT
        );
      } catch (error) {
        Logger.error(
          error,
          this.descriptiveLogMessage(
            `In-memory provider service shutdown has failed`
          ),
          LOG_CONTEXT
        );
      }
    }
  }

  /**
   * This Nest.js hook allows us to execute logic on termination after signal.
   * https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown
   *
   * Enabled by:
   *   app.enableShutdownHooks();
   *
   * in /apps/api/src/bootstrap.ts
   */
  public async onApplicationShutdown(signal): Promise<void> {
    await this.shutdown();
  }
}
