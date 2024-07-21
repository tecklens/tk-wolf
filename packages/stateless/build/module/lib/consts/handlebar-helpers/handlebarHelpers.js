export var HandlebarHelpersEnum;
(function (HandlebarHelpersEnum) {
    HandlebarHelpersEnum["EQUALS"] = "equals";
    HandlebarHelpersEnum["TITLECASE"] = "titlecase";
    HandlebarHelpersEnum["UPPERCASE"] = "uppercase";
    HandlebarHelpersEnum["LOWERCASE"] = "lowercase";
    HandlebarHelpersEnum["PLURALIZE"] = "pluralize";
    HandlebarHelpersEnum["DATEFORMAT"] = "dateFormat";
    HandlebarHelpersEnum["UNIQUE"] = "unique";
    HandlebarHelpersEnum["GROUP_BY"] = "groupBy";
    HandlebarHelpersEnum["SORT_BY"] = "sortBy";
    HandlebarHelpersEnum["NUMBERFORMAT"] = "numberFormat";
    HandlebarHelpersEnum["I18N"] = "i18n";
    HandlebarHelpersEnum["GT"] = "gt";
    HandlebarHelpersEnum["GTE"] = "gte";
    HandlebarHelpersEnum["LT"] = "lt";
    HandlebarHelpersEnum["LTE"] = "lte";
    HandlebarHelpersEnum["EQ"] = "eq";
    HandlebarHelpersEnum["NE"] = "ne";
})(HandlebarHelpersEnum || (HandlebarHelpersEnum = {}));
export const HandlebarHelpers = {
    [HandlebarHelpersEnum.EQUALS]: { description: 'assert equal' },
    [HandlebarHelpersEnum.TITLECASE]: { description: 'transform to TitleCase' },
    [HandlebarHelpersEnum.UPPERCASE]: { description: 'transform to UPPERCASE' },
    [HandlebarHelpersEnum.LOWERCASE]: { description: 'transform to lowercase' },
    [HandlebarHelpersEnum.PLURALIZE]: { description: 'pluralize if needed' },
    [HandlebarHelpersEnum.DATEFORMAT]: { description: 'format date' },
    [HandlebarHelpersEnum.UNIQUE]: {
        description: 'filter unique values in an array',
    },
    [HandlebarHelpersEnum.GROUP_BY]: { description: 'group by a property' },
    [HandlebarHelpersEnum.SORT_BY]: {
        description: 'sort an array of objects by a property',
    },
    [HandlebarHelpersEnum.NUMBERFORMAT]: { description: 'format number' },
    [HandlebarHelpersEnum.I18N]: { description: 'translate' },
    [HandlebarHelpersEnum.GT]: { description: 'greater than' },
    [HandlebarHelpersEnum.GTE]: { description: 'greater than or equal to' },
    [HandlebarHelpersEnum.LT]: { description: 'lesser than' },
    [HandlebarHelpersEnum.LTE]: { description: 'lesser than or equal to' },
    [HandlebarHelpersEnum.EQ]: { description: 'strict equal' },
    [HandlebarHelpersEnum.NE]: { description: 'strict not equal to' },
};
//# sourceMappingURL=handlebarHelpers.js.map