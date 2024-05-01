import { BaseRepository } from '../base-repository';
import { LogDBModel, LogEntity } from './log.entity';
import { LogWolf } from '@libs/repositories/log/log.schema';

export class LogRepository extends BaseRepository<
  LogDBModel,
  LogEntity,
  object
> {
  constructor() {
    super(LogWolf, LogEntity);
  }

  async findById(id: string, select?: string): Promise<LogEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async delByIds(ids: string[]) {
    this.delete({
      _id: {
        $in: ids,
      },
    });
  }
}
