import { Injectable } from '@nestjs/common';
import { LogRepository } from '@libs/repositories/log/log.repository';
import { IJwtPayload } from '@libs/shared/types';
import { FilterLogDto } from '@app/log/dtos/filter-log.dto';
import { FilterLogResponse } from '@app/log/dtos/filter-log.response';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  async analysisLog(
    user: IJwtPayload,
    payload: FilterLogDto,
  ): Promise<FilterLogResponse> {
    const totalPerPeriod = await this.logRepository.aggregate([
      {
        $match: {
          _userId: user._id,
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
              format: '%Y-%m-%d',
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
    ]);

    console.log(totalPerPeriod);

    return {
      data: [],
    };
  }
}
