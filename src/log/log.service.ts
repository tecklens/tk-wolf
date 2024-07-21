import { Injectable } from '@nestjs/common';
import { LogRepository } from '@libs/repositories/log';
import {
  FilterLogDto,
  FilterLogResponse,
  DashboardInfoDto,
} from '@app/log/dtos';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { TaskRepository } from '@libs/repositories/task';
import { SubscriberRepository } from '@libs/repositories/subscriber';
import moment from 'moment';
import { find } from 'lodash';
import { BillingRepository } from '@libs/repositories/billing';
import { IJwtPayload, TaskStatus } from '@wolf/stateless';

@Injectable()
export class LogService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly taskRepository: TaskRepository,
    private readonly billingRepository: BillingRepository,
    private readonly subscriptionRepository: SubscriberRepository,
  ) {}

  @CacheKey('log:analyse')
  async analysisLog(
    user: IJwtPayload,
    payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    const formatDateByPeriod =
      payload.period == 'hour'
        ? '%Y-%m-%d %Hh'
        : payload.period == 'day'
          ? '%Y-%m-%d'
          : '%Y-%m';

    const totalPerPeriod = await this.logRepository.aggregate([
      {
        $match: {
          _userId: user._id,
          _environmentId: user.environmentId,
          _organizationId: user.organizationId,
        },
      },
      {
        $addFields: {
          createdAtDate: {
            $toDate: '$createdAt',
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: formatDateByPeriod,
              date: '$createdAtDate',
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          count: 1,
          date: '$_id',
          _id: 0,
        },
      },
      { $skip: payload.page * payload.limit },
      { $limit: payload.limit },
      { $sort: { date: 1 } },
    ]);

    return {
      data: totalPerPeriod,
    };
  }

  @CacheKey('log:task:error')
  async analysisTaskError(
    user: IJwtPayload,
    payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    const formatDateByPeriod =
      payload.period == 'hour'
        ? '%Y-%m-%d %Hh'
        : payload.period == 'day'
          ? '%Y-%m-%d'
          : '%Y-%m';
    const oneWeekAgo = new Date();
    oneWeekAgo.setMinutes(0);
    oneWeekAgo.setSeconds(0);

    const dates: string[] = [];
    const date = new Date();

    if (payload.period == 'hour') {
      oneWeekAgo.setHours(oneWeekAgo.getHours() - payload.limit);

      for (let i = 0; i < payload.limit; i++) {
        dates.push(moment(date).format('YYYY-MM-DD HH'));
        date.setHours(date.getHours() - 1);
      }
    } else if (payload.period == 'day') {
      oneWeekAgo.setDate(oneWeekAgo.getDate() - payload.limit);
      oneWeekAgo.setHours(0);

      for (let i = 0; i < payload.limit; i++) {
        dates.push(moment(date).format('YYYY-MM-DD'));
        date.setDate(date.getDate() - 1);
      }
    } else {
      oneWeekAgo.setMonth(oneWeekAgo.getMonth() - payload.limit);
      oneWeekAgo.setDate(0);
      oneWeekAgo.setHours(0);
      for (let i = 0; i < payload.limit; i++) {
        dates.push(moment(date).format('YYYY-MM'));
        date.setMonth(date.getMonth() - 1);
      }
    }
    const totalPerPeriod = await this.taskRepository.aggregate([
      {
        $match: {
          _userId: user._id,
          _environmentId: user.environmentId,
          _organizationId: user.organizationId,
          status: TaskStatus.cancel,
          createdAt: {
            $gte: oneWeekAgo,
          },
        },
      },
      {
        $addFields: {
          createdAtDate: {
            $toDate: '$createdAt',
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: formatDateByPeriod,
              date: '$createdAtDate',
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          count: 1,
          date: '$_id',
          _id: 0,
        },
      },
      { $skip: payload.page * payload.limit },
      { $limit: payload.limit },
      { $sort: { date: 1 } },
    ]);

    const rlt = [];
    for (let i = dates.length - 1; i >= 0; i--) {
      rlt.push({
        count: find(totalPerPeriod, (e) => e.date == dates[i])?.count ?? 0,
        date: dates[i],
      });
    }

    return {
      data: rlt,
    };
  }

  @CacheKey('log:task:error')
  async analysisBilling(
    user: IJwtPayload,
    payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    const formatDateByPeriod =
      payload.period == 'hour'
        ? '%Y-%m-%d %Hh'
        : payload.period == 'day'
          ? '%Y-%m-%d'
          : '%Y-%m';
    const oneWeekAgo = new Date();
    oneWeekAgo.setMinutes(0);
    oneWeekAgo.setSeconds(0);

    const dates: string[] = [];
    const date = new Date();

    if (payload.period == 'hour') {
      oneWeekAgo.setHours(oneWeekAgo.getHours() - payload.limit);

      for (let i = 0; i < payload.limit; i++) {
        dates.push(moment(date).format('YYYY-MM-DD HH'));
        date.setHours(date.getHours() - 1);
      }
    } else if (payload.period == 'day') {
      oneWeekAgo.setDate(oneWeekAgo.getDate() - payload.limit);
      oneWeekAgo.setHours(0);

      for (let i = 0; i < payload.limit; i++) {
        dates.push(moment(date).format('YYYY-MM-DD'));
        date.setDate(date.getDate() - 1);
      }
    } else {
      oneWeekAgo.setMonth(oneWeekAgo.getMonth() - payload.limit);
      oneWeekAgo.setDate(0);
      oneWeekAgo.setHours(0);
      for (let i = 0; i < payload.limit; i++) {
        dates.push(moment(date).format('YYYY-MM'));
        date.setMonth(date.getMonth() - 1);
      }
    }
    const totalPerPeriod = await this.billingRepository.aggregate([
      {
        $match: {
          _userId: user._id,
          _environmentId: user.environmentId,
          _organizationId: user.organizationId,
          status: 1,
          createdAt: {
            $gte: oneWeekAgo,
          },
        },
      },
      {
        $addFields: {
          createdAtDate: {
            $toDate: '$createdAt',
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: formatDateByPeriod,
              date: '$createdAtDate',
            },
          },
          count: {
            $sum: '$amount_received',
          },
        },
      },
      {
        $project: {
          count: 1,
          date: '$_id',
          _id: 0,
        },
      },
      { $skip: payload.page * payload.limit },
      { $limit: payload.limit },
      { $sort: { date: 1 } },
    ]);

    const rlt = [];
    for (let i = dates.length - 1; i >= 0; i--) {
      rlt.push({
        count: find(totalPerPeriod, (e) => e.date == dates[i])?.count ?? 0,
        date: dates[i],
      });
    }

    return {
      data: rlt,
    };
  }

  @CacheKey('log:dashboard')
  @CacheTTL(60)
  async getDashboardInfo(u: IJwtPayload): Promise<DashboardInfoDto> {
    return {
      total_call_api: await this.logRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
        _organizationId: u.organizationId,
      }),
      total_subscriptions: await this.subscriptionRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
        _organizationId: u.organizationId,
      }),
    };
  }
}
