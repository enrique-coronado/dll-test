"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaginationParams = void 0;
const pagination_config_1 = require("../config/pagination.config");
const validatePaginationParams = (query) => {
    const { sort, size = pagination_config_1.paginationConfig.defaultPageSize.toString(), page = pagination_config_1.paginationConfig.defaultPage.toString() } = query;
    const pageSize = parseInt(size, 10);
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageSize) || pageSize <= 0 || pageSize > pagination_config_1.paginationConfig.maxPageSize) {
        return { isValid: false, error: `Invalid page size: ${size}` };
    }
    if (isNaN(pageNumber) || pageNumber <= 0) {
        return { isValid: false, error: `Invalid page number: ${page}` };
    }
    const options = {
        page: pageNumber,
        size: pageSize,
    };
    if (sort) {
        const [field, order = pagination_config_1.paginationConfig.defaultSortOrder] = sort.split(':');
        if (!field || (order !== 'asc' && order !== 'desc')) {
            return { isValid: false, error: 'Invalid sort parameter' };
        }
        options.sort = { field, order };
    }
    return { isValid: true, options };
};
exports.validatePaginationParams = validatePaginationParams;
//# sourceMappingURL=validation.util.js.map