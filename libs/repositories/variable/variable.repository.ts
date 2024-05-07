import { BaseRepository } from '../base-repository';
import { VariableDBModel, VariableEntity } from './variable.entity';
import { Variable } from './variable.schema';

export class VariableRepository extends BaseRepository<
  VariableDBModel,
  VariableEntity,
  object
> {
  constructor() {
    super(Variable, VariableEntity);
  }

  async findById(id: string, select?: string): Promise<VariableEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByWfId(wfId: string, select?: string): Promise<VariableEntity[]> {
    return await this.find(
      {
        _workflowId: wfId,
      },
      select,
    );
  }
}
