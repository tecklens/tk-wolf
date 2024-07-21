"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsImageUrl = void 0;
const class_validator_1 = require("class-validator");
function IsImageUrl(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isImageUrl',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
                    const extension = value.split('.').pop();
                    if (!extension)
                        return false;
                    return validExtensions.includes(extension);
                },
            },
        });
    };
}
exports.IsImageUrl = IsImageUrl;
//# sourceMappingURL=image.validator.js.map