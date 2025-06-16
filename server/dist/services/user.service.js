"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const pagination_util_1 = require("../utils/pagination.util");
const users_data_1 = require("../data/users.data");
class UserService {
    constructor() {
        this.users = users_data_1.usersData;
    }
    /**
     * Retrieves all users without pagination
     * @returns Array of all users
     */
    getAllUsers() {
        return this.users;
    }
    /**
     * Retrieves users with pagination and optional sorting
     * @param options - Pagination options including page, size, and sort parameters
     * @returns Paginated result containing users and pagination metadata
     */
    getPaginatedUsers(options) {
        return (0, pagination_util_1.paginateArray)(this.users, options);
    }
    /**
     * Finds a user by their unique identifier
     * @param id - The user's unique identifier
     * @returns The user if found, undefined otherwise
     */
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map