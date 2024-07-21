import { BaseRepository } from '../base-repository';
import { NodeDBModel, NodeEntity } from './node.entity';
import { NodeSchema } from '@libs/repositories/node/node.schema';
import { WfNodeType } from '@wolf/stateless';

export class NodeRepository extends BaseRepository<
  NodeDBModel,
  NodeEntity,
  object
> {
  constructor() {
    super(NodeSchema, NodeEntity);
  }

  async findById(id: string, select?: string): Promise<NodeEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByIdIn(ids: string[]): Promise<NodeEntity[]> {
    return this.find({
      _id: {
        $in: ids,
      },
    });
  }

  async findByWorkflowId(workflowId: string): Promise<NodeEntity[]> {
    const query = {
      _workflowId: workflowId,
    };

    return await this.find(query);
  }

  async findOneByWorkflowIdAndType(
    workflowId: string,
    type: WfNodeType,
  ): Promise<NodeEntity> {
    const query = {
      _workflowId: workflowId,
      type: type,
    };

    return await this.findOne(query);
  }

  async delByIds(ids: string[]) {
    this.delete({
      _id: {
        $in: ids,
      },
    });
  }
}
