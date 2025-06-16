"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (error, req, res, _next) => {
    const statusCode = error.statusCode || 500;
    logger_1.default.error('Error occurred', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        statusCode
    });
    res.status(statusCode).json({
        error: {
            message: statusCode === 500 ? 'Internal server error' : error.message,
            statusCode,
            timestamp: new Date().toISOString()
        }
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: {
            message: `Route ${req.method} ${req.url} not found`,
            statusCode: 404,
            timestamp: new Date().toISOString()
        }
    });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error.middleware.js.map