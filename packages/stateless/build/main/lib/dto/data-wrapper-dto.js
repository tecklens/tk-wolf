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
exports.DataNumberDto = exports.DataBooleanDto = exports.DataWrapperDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DataWrapperDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DataWrapperDto.prototype, "data", void 0);
exports.DataWrapperDto = DataWrapperDto;
class DataBooleanDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], DataBooleanDto.prototype, "data", void 0);
exports.DataBooleanDto = DataBooleanDto;
class DataNumberDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DataNumberDto.prototype, "data", void 0);
exports.DataNumberDto = DataNumberDto;
//# sourceMappingURL=data-wrapper-dto.js.map