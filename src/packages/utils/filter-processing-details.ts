import { SubscriberEntity } from '@pak/repositories/subscriber';
import { ICondition } from '@tps/filter.types';
import { StepFilter } from '@pak/repositories/notification-template';
import { ITriggerPayload } from '@tps/events';

export interface IFilterVariables {
  payload?: ITriggerPayload;
  subscriber?: SubscriberEntity;
  webhook?: Record<string, unknown>;
}

export class FilterProcessingDetails {
  private conditions: ICondition[] = [];
  private filter: StepFilter;
  private variables: IFilterVariables;

  addFilter(filter: StepFilter, variables: IFilterVariables) {
    this.filter = filter;
    this.variables = variables;
    this.conditions = [];
  }

  addCondition(condition: ICondition) {
    this.conditions.push(condition);
  }

  toObject() {
    return {
      payload: this.variables,
      filter: this.filter,
      conditions: this.conditions,
    };
  }

  toString() {
    return JSON.stringify(this.toObject());
  }
}
