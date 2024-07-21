var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
export function PaginationRequestDto(defaultLimit = 10, maxLimit = 100) {
    class PaginationRequest {
        page = 0;
        limit = defaultLimit;
    }
    __decorate([
        ApiPropertyOptional({
            type: Number,
            required: false,
        }),
        Type(() => Number),
        IsInt(),
        __metadata("design:type", Object)
    ], PaginationRequest.prototype, "page", void 0);
    __decorate([
        ApiPropertyOptional({
            type: Number,
            required: false,
            default: defaultLimit,
            maximum: maxLimit,
        }),
        Type(() => Number),
        IsInt(),
        Min(1),
        Max(maxLimit),
        __metadata("design:type", Object)
    ], PaginationRequest.prototype, "limit", void 0);
    return PaginationRequest;
}
//# sourceMappingURL=pagination-request.js.map