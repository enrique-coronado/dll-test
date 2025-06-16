"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const validation_util_1 = require("../utils/validation.util");
const pagination_util_1 = require("../utils/pagination.util");
const user_service_1 = require("../services/user.service");
const logger_1 = __importDefault(require("../config/logger"));
class UserController {
    /**
     * Retrieves a paginated list of users with optional sorting
     * @param req - Express request object containing pagination query parameters
     * @param res - Express response object for sending the paginated user data
     * @returns Promise that resolves when response is sent
     */
    async getUsers(req, res) {
        logger_1.default.info('GET /users', {
            query: req.query,
            ip: req.ip
        });
        const validation = (0, validation_util_1.validatePaginationParams)(req.query);
        if (!validation.isValid) {
            logger_1.default.warn('Invalid pagination parameters', {
                error: validation.error,
                query: req.query
            });
            return res.status(400).json({
                data: [],
                paging: { totalResults: 0 }
            });
        }
        const result = user_service_1.userService.getPaginatedUsers(validation.options);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
        const links = (0, pagination_util_1.buildPaginationLinks)(baseUrl, result, validation.options);
        logger_1.default.info('Users retrieved successfully', {
            returned: result.data.length,
            total: result.totalResults,
            page: validation.options.page,
            size: validation.options.size
        });
        res.json({
            data: result.data,
            paging: Object.assign({ totalResults: result.totalResults }, links)
        });
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map