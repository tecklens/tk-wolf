import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BadRequestException, flatten } from '@nestjs/common';

export abstract class BaseCommand {
  static create<T extends BaseCommand>(
    this: new (...args: any[]) => T,
    data: T
  ): T {
    const convertedObject = plainToInstance<T, any>(this, {
      ...data,
    });

    const errors = validateSync(convertedObject as unknown as object);
    if (errors?.length) {
      const mappedErrors = flatten(
        errors.map((item) => Object.values((item as any).constraints))
      );

      throw new BadRequestException(mappedErrors);
    }

    return convertedObject;
  }
}
