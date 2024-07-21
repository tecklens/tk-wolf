var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
export class PaginatedResponseDto {
    page;
    hasMore;
    pageSize;
    data;
}
__decorate([
    ApiProperty({
        description: 'The current page of the paginated response',
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "page", void 0);
__decorate([
    ApiProperty({
        description: 'Does the list have more items to fetch',
    }),
    __metadata("design:type", Boolean)
], PaginatedResponseDto.prototype, "hasMore", void 0);
__decorate([
    ApiProperty({
        description: 'Number of items on each page',
    }),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "pageSize", void 0);
__decorate([
    ApiProperty({
        description: 'The list of items matching the query',
        isArray: true,
        type: Object,
    }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
//# sourceMappingURL=pagination-response.js.map