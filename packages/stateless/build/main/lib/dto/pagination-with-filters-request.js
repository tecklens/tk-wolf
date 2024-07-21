"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationWithFiltersRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_request_1 = require("@stateless/lib/dto/pagination-request");
function PaginationWithFiltersRequestDto({ defaultLimit = 10, maxLimit = 100, queryDescription, }) {
    class PaginationWithFiltersRequest extends (0, pagination_request_1.PaginationRequestDto)(defaultLimit, maxLimit) {
    }
    __decorate([
        (0, swagger_1.ApiPropertyOptional)({
            type: String,
            required: false,
            description: `A query string to filter the results. ${queryDescription}`,
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], PaginationWithFiltersRequest.prototype, "query", void 0);
    return PaginationWithFiltersRequest;
}
exports.PaginationWithFiltersRequestDto = PaginationWithFiltersRequestDto;
//# sourceMappingURL=pagination-with-filters-request.js.map