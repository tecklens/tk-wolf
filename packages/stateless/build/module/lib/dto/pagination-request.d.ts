import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { IPaginationParams } from '../types';
export declare function PaginationRequestDto(defaultLimit?: number, maxLimit?: number): Constructor<IPaginationParams>;