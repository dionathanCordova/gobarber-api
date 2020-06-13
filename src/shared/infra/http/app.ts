import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(
    (erro: Error, request: Request, response: Response, _: NextFunction) => {
        if (erro instanceof AppError) {
            return response.status(erro.statusCode).json({
                status: 'error',
                message: erro.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal server error: ${erro.message}`,
        });
    },
);

export default app;
