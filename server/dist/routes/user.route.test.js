"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const app = (0, express_1.default)();
app.use('/api/users', user_route_1.default);
describe('GET /api/users', () => {
    test('should return all users without pagination', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users')
            .expect(200);
        expect(response.body.data).toHaveLength(5);
        expect(response.body.paging.totalResults).toBe(5);
    });
    test('should return paginated results', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?size=2&page=1')
            .expect(200);
        expect(response.body.data).toHaveLength(2);
        expect(response.body.paging.totalResults).toBe(5);
        expect(response.body.paging.next).toContain('page=2');
    });
    test('should sort by name ascending', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?sort=name:asc')
            .expect(200);
        const names = response.body.data.map((user) => user.name);
        expect(names).toEqual(['Andrew', 'Jorn', 'Markus', 'Mike', 'Ori']);
    });
    test('should return 400 for invalid page size', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?size=0')
            .expect(400);
        expect(response.body.data).toHaveLength(0);
        expect(response.body.paging.totalResults).toBe(0);
    });
    test('should return 400 for invalid page number', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?page=0')
            .expect(400);
        expect(response.body.data).toHaveLength(0);
        expect(response.body.paging.totalResults).toBe(0);
    });
    test('should handle large page size within limits', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?size=100')
            .expect(200);
        expect(response.body.data).toHaveLength(5);
        expect(response.body.paging.totalResults).toBe(5);
    });
    test('should return 400 for page size exceeding maximum', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?size=101')
            .expect(400);
        expect(response.body.data).toHaveLength(0);
        expect(response.body.paging.totalResults).toBe(0);
    });
    test('should sort by name descending', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?sort=name:desc')
            .expect(200);
        const names = response.body.data.map((user) => user.name);
        expect(names).toEqual(['Ori', 'Mike', 'Markus', 'Jorn', 'Andrew']);
    });
    test('should handle non-existent page gracefully', async () => {
        const response = await (0, supertest_1.default)(app)
            .get('/api/users?page=999&size=10')
            .expect(200);
        expect(response.body.data).toHaveLength(0);
        expect(response.body.paging.totalResults).toBe(5);
    });
});
//# sourceMappingURL=user.route.test.js.map