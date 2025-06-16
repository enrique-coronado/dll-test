import app from './config/express';
import routes from './routes/index.route';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import logger from './config/logger';

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Router
app.use('/api', routes);

app.listen(app.get('port'), app.get('host'), () => {
    logger.info('Server started successfully', {
        host: app.get('host'),
        port: app.get('port'),
        environment: process.env.NODE_ENV || 'development'
    });
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
    console.log(`Swagger docs available at http://${app.get('host')}:${app.get('port')}/api-docs`);
});

export default app;
