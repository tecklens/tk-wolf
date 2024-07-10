import { BaseRepository } from '../base-repository';
import { BillingEntity, BillingDBModel } from './billing.entity';
import { Billing } from './billing.schema';

export class BillingRepository extends BaseRepository<
  BillingDBModel,
  BillingEntity,
  object
> {
  constructor() {
    super(Billing, BillingEntity);
  }
}
