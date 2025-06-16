"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
// Swagger documentation
express_1.default.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
// Router
express_1.default.use('/api', index_route_1.default);
express_1.default.listen(express_1.default.get('port'), express_1.default.get('host'), () => {
    console.log(`Server running at http://${express_1.default.get('host')}:${express_1.default.get('port')}`);
    console.log(`Swagger docs available at http://${express_1.default.get('host')}:${express_1.default.get('port')}/api-docs`);
});
exports.default = express_1.default;
//# sourceMappingURL=app.js.map