import app from './config/express';
import routes from './routes/index.route';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Router
app.use('/api', routes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
    console.log(`Swagger docs available at http://${app.get('host')}:${app.get('port')}/api-docs`);
});

export default app;
