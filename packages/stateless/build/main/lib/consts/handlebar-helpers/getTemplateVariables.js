"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateVariables = void 0;
const handlebarHelpers_1 = require("./handlebarHelpers");
const types_1 = require("../../types");
function getTemplateVariables(bod) {
    const pairVariables = bod
        .filter((body) => body.type === 'HashPair')
        .flatMap((body) => {
        const varName = body.value?.original;
        if (!shouldAddVariable(varName)) {
            return [];
        }
        return {
            type: types_1.TemplateVariableTypeEnum.STRING,
            name: body.value?.original,
            defaultValue: '',
            required: false,
        };
    });
    const stringVariables = bod
        .filter((body) => body.type === 'MustacheStatement')
        .flatMap((body) => {
        const varName = body.params[0]?.original || body.path.original;
        if (body.path?.original === handlebarHelpers_1.HandlebarHelpersEnum.I18N) {
            if (body.hash?.pairs) {
                return getTemplateVariables(body.hash.pairs);
            }
            return [];
        }
        if (!shouldAddVariable(varName)) {
            return [];
        }
        if (body.params?.[0]?.original) {
            if (!Object.values(handlebarHelpers_1.HandlebarHelpersEnum).includes(body.path.original)) {
                return [];
            }
        }
        return {
            type: types_1.TemplateVariableTypeEnum.STRING,
            name: body.params?.[0]?.original || body.path?.original,
            defaultValue: '',
            required: false,
        };
    });
    const arrayVariables = bod
        .filter((body) => body.type === 'BlockStatement' &&
        ['each', 'with'].includes(body.path.original))
        .flatMap((body) => {
        const varName = body.params[0]?.original || body.path.original;
        if (!shouldAddVariable(varName)) {
            return [];
        }
        const nestedVariablesInBlock = getTemplateVariables(body.program.body).map((mustVar) => {
            return {
                ...mustVar,
                name: `${varName}.${mustVar.name}`,
            };
        });
        if (['with'].includes(body.path.original)) {
            return [...nestedVariablesInBlock];
        }
        return [
            {
                type: types_1.TemplateVariableTypeEnum.ARRAY,
                name: varName,
                required: false,
            },
            ...nestedVariablesInBlock,
        ];
    });
    const boolVariables = bod
        .filter((body) => body.type === 'BlockStatement' &&
        ['if', 'unless'].includes(body.path.original))
        .flatMap((body) => {
        const varName = body.params[0]?.original || body.path.original;
        if (!shouldAddVariable(varName)) {
            return [];
        }
        if (body.params.length > 1) {
            return [];
        }
        const nestedVariablesInBlock = getTemplateVariables(body.program.body);
        return [
            {
                type: types_1.TemplateVariableTypeEnum.BOOLEAN,
                name: varName,
                defaultValue: true,
                required: false,
            },
            ...nestedVariablesInBlock,
        ];
    });
    return stringVariables
        .concat(arrayVariables)
        .concat(boolVariables)
        .concat(pairVariables);
}
exports.getTemplateVariables = getTemplateVariables;
const shouldAddVariable = (variableName) => {
    const validRegExp = /^[a-zA-Z_][a-zA-Z0-9_-]*?/;
    const isValid = variableName.match(validRegExp);
    return isValid;
};
//# sourceMappingURL=getTemplateVariables.js.map