export * from './handlebarHelpers';
export * from './getTemplateVariables';

export const wolfReservedVariableNames = ['body'];

export function isReservedVariableName(variableName: string) {
  return wolfReservedVariableNames.includes(variableName);
}
