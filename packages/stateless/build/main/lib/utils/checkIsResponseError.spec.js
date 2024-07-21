"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIsResponseError_1 = require("./checkIsResponseError");
describe('checkIsResponseError', () => {
    it('should return true for a valid IResponseError object', () => {
        const error = {
            error: 'Something went wrong',
            message: 'An error occurred',
            statusCode: 500,
        };
        const result = (0, checkIsResponseError_1.checkIsResponseError)(error);
        expect(result).toBe(true);
    });
    it('should return false for null', () => {
        const result = (0, checkIsResponseError_1.checkIsResponseError)(null);
        expect(result).toBe(false);
    });
    it('should return false for undefined', () => {
        const result = (0, checkIsResponseError_1.checkIsResponseError)(undefined);
        expect(result).toBe(false);
    });
    it('should return false for a non-object value', () => {
        const result = (0, checkIsResponseError_1.checkIsResponseError)('This is a string');
        expect(result).toBe(false);
    });
    it('should return false if the object is missing the "error" property', () => {
        const error = {
            message: 'An error occurred',
            statusCode: 500,
        };
        const result = (0, checkIsResponseError_1.checkIsResponseError)(error);
        expect(result).toBe(false);
    });
    it('should return false if the object is missing the "message" property', () => {
        const error = {
            error: 'Something went wrong',
            statusCode: 500,
        };
        const result = (0, checkIsResponseError_1.checkIsResponseError)(error);
        expect(result).toBe(false);
    });
    it('should return false if the object is missing the "statusCode" property', () => {
        const error = {
            error: 'Something went wrong',
            message: 'An error occurred',
        };
        const result = (0, checkIsResponseError_1.checkIsResponseError)(error);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=checkIsResponseError.spec.js.map