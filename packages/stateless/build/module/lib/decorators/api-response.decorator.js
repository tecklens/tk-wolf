import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, getSchemaPath, } from '@nestjs/swagger';
import { DataWrapperDto } from '../dto';
export const ApiResponse = (dataDto, statusCode = 200, isResponseArray = false) => {
    const Response = statusCode === 201 ? ApiCreatedResponse : ApiOkResponse;
    return applyDecorators(ApiExtraModels(DataWrapperDto, dataDto), Response({
        description: statusCode === 201 ? 'Created' : 'Ok',
        schema: {
            properties: isResponseArray
                ? { data: { type: 'array', items: { $ref: getSchemaPath(dataDto) } } }
                : { data: { $ref: getSchemaPath(dataDto) } },
        },
    }));
};
//# sourceMappingURL=api-response.decorator.js.map