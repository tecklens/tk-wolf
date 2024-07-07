import { Injectable } from '@nestjs/common';
import { LogRepository } from '@libs/repositories/log/log.repository';
import { IJwtPayload } from '@libs/shared/types';
import { FilterLogDto } from '@app/log/dtos/filter-log.dto';
import { FilterLogResponse } from '@app/log/dtos/filter-log.response';
import { CacheKey } from '@nestjs/cache-manager';
import { DashboardInfoDto } from '@app/log/dtos/dashboard-info.dto';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

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
      { $sort: { date: -1 } },
    ]);

    return {
      data: totalPerPeriod,
    };
  }

  @CacheKey('log:dashboard')
  async getDashboardInfo(u: IJwtPayload): Promise<DashboardInfoDto> {
    return {
      total_call_api: await this.logRepository.count({
        _userId: u._id,
        _environmentId: u.environmentId,
        _organizationId: u.organizationId,
      }),
    };
  }
}
