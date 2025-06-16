"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_util_1 = require("./pagination.util");
describe('Pagination Utils', () => {
    const testData = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
    ];
    describe('paginateArray', () => {
        test('should paginate without sorting', () => {
            const options = { page: 1, size: 2 };
            const result = (0, pagination_util_1.paginateArray)(testData, options);
            expect(result.data).toHaveLength(2);
            expect(result.totalResults).toBe(5);
            expect(result.totalPages).toBe(3);
            expect(result.page).toBe(1);
            expect(result.size).toBe(2);
        });
        test('should paginate with sorting', () => {
            const options = {
                page: 1,
                size: 2,
                sort: { field: 'name', order: 'asc' }
            };
            const result = (0, pagination_util_1.paginateArray)(testData, options);
            expect(result.data[0].name).toBe('Alice');
            expect(result.data[1].name).toBe('Bob');
        });
        test('should handle last page correctly', () => {
            const options = { page: 3, size: 2 };
            const result = (0, pagination_util_1.paginateArray)(testData, options);
            expect(result.data).toHaveLength(1);
            expect(result.data[0].id).toBe(5);
        });
    });
    describe('buildPaginationLinks', () => {
        test('should build links with previous and next', () => {
            const result = { totalPages: 3 };
            const options = { page: 2, size: 2 };
            const links = (0, pagination_util_1.buildPaginationLinks)('http://test.com/api/users', result, options);
            expect(links.previous).toBe('http://test.com/api/users?size=2&page=1');
            expect(links.next).toBe('http://test.com/api/users?size=2&page=3');
        });
        test('should not include previous link on first page', () => {
            const result = { totalPages: 3 };
            const options = { page: 1, size: 2 };
            const links = (0, pagination_util_1.buildPaginationLinks)('http://test.com/api/users', result, options);
            expect(links.previous).toBeUndefined();
            expect(links.next).toBe('http://test.com/api/users?size=2&page=2');
        });
        test('should not include next link on last page', () => {
            const result = { totalPages: 3 };
            const options = { page: 3, size: 2 };
            const links = (0, pagination_util_1.buildPaginationLinks)('http://test.com/api/users', result, options);
            expect(links.previous).toBe('http://test.com/api/users?size=2&page=2');
            expect(links.next).toBeUndefined();
        });
    });
});
//# sourceMappingURL=pagination.util.test.js.map