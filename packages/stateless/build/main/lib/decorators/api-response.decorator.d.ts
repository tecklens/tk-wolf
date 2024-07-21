import { Type } from '@nestjs/common';
export declare const ApiResponse: <DataDto extends Type<unknown>>(dataDto: DataDto, statusCode?: 200 | 201, isResponseArray?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
