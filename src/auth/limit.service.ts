import { Injectable } from '@nestjs/common';
import {
  IRateLimiterRedisOptions,
  RateLimiterRedis,
} from 'rate-limiter-flexible';
import Redis from 'ioredis';

export const MAX_POINT_IN_MONTH = 1000000000;

@Injectable()
export class LimitService {
  private limiter: RateLimiterRedis;
  constructor() {
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      enableOfflineQueue: false,
    });
    const opts: IRateLimiterRedisOptions = {
      // Basic options
      storeClient: redisClient,
      points: MAX_POINT_IN_MONTH, // Number of points
      duration: 30 * 24 * 60 * 60, // Per second(s)

      // Custom
      blockDuration: 0, // Do not block if consumed more than points
      keyPrefix: 'wolf-limit', // must be unique for limiters with different purpose
    };

    this.limiter = new RateLimiterRedis(opts);
  }

  getLimiter() {
    return this.limiter;
  }
}
