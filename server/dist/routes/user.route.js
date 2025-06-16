"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_util_1 = require("../utils/validation.util");
const pagination_util_1 = require("../utils/pagination.util");
const user_service_1 = require("../services/user.service");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get paginated list of users
 *     description: Retrieve users with optional pagination and sorting
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "name:asc"
 *         description: Sort field and order (field:asc or field:desc)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get('/', (req, res) => {
    console.log(`GET /users - Query params: sort=${req.query.sort}, size=${req.query.size}, page=${req.query.page}`);
    const validation = (0, validation_util_1.validatePaginationParams)(req.query);
    if (!validation.isValid) {
        console.log(validation.error);
        return res.status(400).json({
            data: [],
            paging: { totalResults: 0 }
        });
    }
    const result = user_service_1.userService.getPaginatedUsers(validation.options);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const links = (0, pagination_util_1.buildPaginationLinks)(baseUrl, result, validation.options);
    console.log(`Returning ${result.data.length} users out of ${result.totalResults} total`);
    res.json({
        data: result.data,
        paging: Object.assign({ totalResults: result.totalResults }, links)
    });
});
exports.default = router;
//# sourceMappingURL=user.route.js.map