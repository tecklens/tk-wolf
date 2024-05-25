import { BaseRepository } from '../base-repository';
import { WorkflowDBModel, WorkflowEntity } from './workflow.entity';
import { Workflow } from './workflow.schema';

export interface IWfPage {
  workflows: WorkflowEntity[];
  total: number;
}

export class WorkflowRepository extends BaseRepository<
  WorkflowDBModel,
  WorkflowEntity,
  object
> {
  constructor() {
    super(Workflow, WorkflowEntity);
  }

  async findById(id: string, select?: string): Promise<WorkflowEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByUserId(userId: string, skip = 0, limit = 10): Promise<IWfPage> {
    const query = {
      _userId: userId,
    };
    const total = this.count(query);

    return {
      workflows: await this.find(query, {}, { skip, limit }),
      total: await total,
    };
  }

  async findOneByUserIdAndNameAndWorkflowIdNotEqual(
    userId: string,
    name: string,
    workflowId: string,
  ): Promise<WorkflowEntity> {
    return await this.findOne({
      _userId: userId,
      name: name,
      _id: {
        $ne: workflowId,
      },
    });
  }

  async updateActive(wId: string, uId: string) {
    await this.update(
      {
        _userId: uId,
      },
      { active: false },
    );

    await this.updateOne(
      {
        _id: wId,
      },
      { active: true },
    );
  }

  async getActive(userId: string) {
    return await this.findOne({
      _userId: userId,
      active: true,
    });
  }
}
