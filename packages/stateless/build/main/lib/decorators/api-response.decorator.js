"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const ApiResponse = (dataDto, statusCode = 200, isResponseArray = false) => {
    const Response = statusCode === 201 ? swagger_1.ApiCreatedResponse : swagger_1.ApiOkResponse;
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dto_1.DataWrapperDto, dataDto), Response({
        description: statusCode === 201 ? 'Created' : 'Ok',
        schema: {
            properties: isResponseArray
                ? { data: { type: 'array', items: { $ref: (0, swagger_1.getSchemaPath)(dataDto) } } }
                : { data: { $ref: (0, swagger_1.getSchemaPath)(dataDto) } },
        },
    }));
};
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api-response.decorator.js.map