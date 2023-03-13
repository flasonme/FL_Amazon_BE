import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import {IRoute} from '@/interfaces';
import {logger, stream} from '@/utils';
import {errorMiddleware, QueryMiddleware} from '@/middlewares';
import config from '@config';
import {mongoose} from "@typegoose/typegoose";

export default class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: IRoute[]) {
        this.app = express();
        this.env = config.NODE_ENV || 'development';
        this.port = config.SERVER.PORT || 8080;

        this.connectToDatabase().then(
            () => {
                this.initializeMiddlewares();
                this.initializeRoutes(routes);
                this.initializeSwagger();
                this.initializeErrorHandling();
            }
        );

    }

    private async connectToDatabase() {
        if (this.env !== 'production') {
            mongoose.set('debug', true);
            mongoose.set('strictQuery', false);
        }

        await mongoose.connect(config.MONGODB.MONGODB_URI);
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(morgan(config.LOG_FORMAT, {stream}));
        this.app.use(cors({origin: config.ORIGIN, credentials: config.CREDENTIALS}));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
        // Run query on every request
        this.app.use(QueryMiddleware)
    }

    private initializeRoutes(routes: IRoute[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeSwagger() {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Express API for Boilerplate',
                    version: '1.0.0',
                    description: 'Express Boilerplate API Docs',
                },
            },
            apis: ['swagger.yaml'],
        };
        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}
