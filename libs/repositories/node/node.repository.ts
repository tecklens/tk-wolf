import { BaseRepository } from '../base-repository';
import { NodeDBModel, NodeEntity } from './node.entity';
import { NodeSchema } from "@libs/repositories/node/node.schema";

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

  async findByWorkflowId(workflowId: string): Promise<NodeEntity[]> {
    const query = {
      _workflowId: workflowId,
    };

    return await this.find(query);
  }
}
