import { BaseRepository } from '../base-repository';
import { EdgeDBModel, EdgeEntity } from './edge.entity';
import { EdgeSchema } from '@libs/repositories/edge/edge.schema';

export class EdgeRepository extends BaseRepository<
  EdgeDBModel,
  EdgeEntity,
  object
> {
  constructor() {
    super(EdgeSchema, EdgeEntity);
  }

  async findById(id: string, select?: string): Promise<EdgeEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByWorkflowId(workflowId: string): Promise<EdgeEntity[]> {
    const query = {
      _workflowId: workflowId,
    };

    return await this.find(query);
  }
}
