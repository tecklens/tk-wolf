export * from './handlebarHelpers';
export * from './getTemplateVariables';
export const wolfReservedVariableNames = ['body'];
export function isReservedVariableName(variableName) {
    return wolfReservedVariableNames.includes(variableName);
}
//# sourceMappingURL=index.js.map