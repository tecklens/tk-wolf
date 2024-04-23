import * as mongoose from "mongoose";
import { Schema } from "mongoose";

import { schemaOptions } from "../schema-default.options";
import { WorkflowDBModel } from "./workflow.entity";

const workflowSchema = new Schema<WorkflowDBModel>(
  {
    _organizationId: Schema.Types.String,
    _environmentId: Schema.Types.String,
    _userId: Schema.Types.String,
    active: Schema.Types.Boolean,
    deleted: Schema.Types.Boolean,
    deletedAt: Schema.Types.String,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,
    description: Schema.Types.String,
    identifier: Schema.Types.String,
    name: Schema.Types.String,
    tags: Schema.Types.Array
  },
  schemaOptions
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Workflow =
  (mongoose.models.Workflow as mongoose.Model<WorkflowDBModel>) ||
  mongoose.model<WorkflowDBModel>("Workflow", workflowSchema);
