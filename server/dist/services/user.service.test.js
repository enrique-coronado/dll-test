"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./user.service");
describe('UserService', () => {
    let userService;
    beforeEach(() => {
        userService = new user_service_1.UserService();
    });
    test('should get all users', () => {
        const users = userService.getAllUsers();
        expect(users).toHaveLength(5);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('name');
    });
    test('should get user by id', () => {
        const user = userService.getUserById(1);
        expect(user).toBeDefined();
        expect(user === null || user === void 0 ? void 0 : user.id).toBe(1);
        expect(user === null || user === void 0 ? void 0 : user.name).toBe('Mike');
    });
    test('should return undefined for non-existent user id', () => {
        const user = userService.getUserById(999);
        expect(user).toBeUndefined();
    });
    test('should get paginated users with sorting', () => {
        const result = userService.getPaginatedUsers({
            page: 1,
            size: 2,
            sort: { field: 'name', order: 'asc' }
        });
        expect(result.data).toHaveLength(2);
        expect(result.totalResults).toBe(5);
        expect(result.totalPages).toBe(3);
        expect(result.data[0].name).toBe('Andrew');
        expect(result.data[1].name).toBe('Jorn');
    });
    test('should handle empty page results', () => {
        const result = userService.getPaginatedUsers({
            page: 10,
            size: 10
        });
        expect(result.data).toHaveLength(0);
        expect(result.totalResults).toBe(5);
        expect(result.page).toBe(10);
    });
});
//# sourceMappingURL=user.service.test.js.map