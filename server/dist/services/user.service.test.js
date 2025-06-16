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
});
//# sourceMappingURL=user.service.test.js.map