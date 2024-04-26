import * as mongoose from "mongoose";
import { Schema } from "mongoose";

import { schemaOptions } from "../schema-default.options";
import { NodeDBModel } from "./node.entity";
import { ProviderId } from "@libs/repositories/provider/types";

const nodeSchema = new Schema<NodeDBModel>(
  {
    _workflowId: { type: Schema.Types.String, index: true },
    _providerId: Schema.Types.String,
    deleted: Schema.Types.Boolean,
    connected: Schema.Types.Boolean,
    deletedAt: Schema.Types.String,
    deletedBy: Schema.Types.String,
    createdAt: Schema.Types.String,
    updatedAt: Schema.Types.String,
    position: Schema.Types.Mixed,
    data: Schema.Types.Mixed,
    type: Schema.Types.String,
    sourcePosition: Schema.Types.Mixed,
    targetPosition: Schema.Types.Mixed,
    resizing: Schema.Types.Boolean,
    width: Schema.Types.Number,
    height: Schema.Types.Number,
    parentNode: Schema.Types.String,
    parentId: Schema.Types.String,
    zIndex: Schema.Types.Number,
    extent: Schema.Types.String,
    expandParent: Schema.Types.Boolean,
    positionAbsolute: Schema.Types.Mixed,
    ariaLabel: Schema.Types.String,
    focusable: Schema.Types.Boolean,
    style: Schema.Types.Mixed,
    className: Schema.Types.String
  },
  schemaOptions
);


nodeSchema.index({ _workflowId: 1, type: 1 });
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NodeSchema =
  (mongoose.models.Node as mongoose.Model<NodeDBModel>) ||
  mongoose.model<NodeDBModel>("Node", nodeSchema);
