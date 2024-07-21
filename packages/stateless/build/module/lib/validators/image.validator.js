import { registerDecorator, } from 'class-validator';
export function IsImageUrl(validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
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
//# sourceMappingURL=image.validator.js.map