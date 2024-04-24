import { BaseRepository } from '../base-repository';
import { TaskDBModel, TaskEntity } from './task.entity';
import { Task } from '@libs/repositories/task/task.schema';

export class TaskRepository extends BaseRepository<
  TaskDBModel,
  TaskEntity,
  object
> {
  constructor() {
    super(Task, TaskEntity);
  }

  async findById(id: string, select?: string): Promise<TaskEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByWorkflowId(workflowId: string): Promise<TaskEntity[]> {
    const query = {
      _workflowId: workflowId,
    };

    return await this.find(query);
  }

  async delByIds(ids: string[]) {
    this.delete({
      _id: {
        $in: ids,
      },
    });
  }
}
