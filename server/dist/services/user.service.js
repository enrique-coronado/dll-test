"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const pagination_util_1 = require("../utils/pagination.util");
const users_data_1 = require("../data/users.data");
class UserService {
    constructor() {
        this.users = users_data_1.usersData;
    }
    getAllUsers() {
        return this.users;
    }
    getPaginatedUsers(options) {
        return (0, pagination_util_1.paginateArray)(this.users, options);
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map