"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const sortArray = (array, field, order = 'asc') => {
    return [...array].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (aValue < bValue)
            return order === 'desc' ? 1 : -1;
        if (aValue > bValue)
            return order === 'desc' ? -1 : 1;
        return 0;
    });
};
exports.sortArray = sortArray;
//# sourceMappingURL=sorting.util.js.map