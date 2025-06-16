"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginationLinks = exports.paginateArray = void 0;
const sorting_util_1 = require("./sorting.util");
const paginateArray = (array, options) => {
    let sortedArray = array;
    if (options.sort) {
        sortedArray = (0, sorting_util_1.sortArray)(array, options.sort.field, options.sort.order);
    }
    const totalResults = sortedArray.length;
    const totalPages = Math.ceil(totalResults / options.size);
    const startIndex = (options.page - 1) * options.size;
    const endIndex = startIndex + options.size;
    const data = sortedArray.slice(startIndex, endIndex);
    return {
        data,
        totalResults,
        page: options.page,
        size: options.size,
        totalPages,
    };
};
exports.paginateArray = paginateArray;
const buildPaginationLinks = (baseUrl, result, options) => {
    const queryParams = new URLSearchParams();
    if (options.sort) {
        queryParams.set('sort', `${options.sort.field}:${options.sort.order}`);
    }
    queryParams.set('size', options.size.toString());
    const links = {};
    if (options.page > 1) {
        queryParams.set('page', (options.page - 1).toString());
        links.previous = `${baseUrl}?${queryParams.toString()}`;
    }
    if (options.page < result.totalPages) {
        queryParams.set('page', (options.page + 1).toString());
        links.next = `${baseUrl}?${queryParams.toString()}`;
    }
    return links;
};
exports.buildPaginationLinks = buildPaginationLinks;
//# sourceMappingURL=pagination.util.js.map