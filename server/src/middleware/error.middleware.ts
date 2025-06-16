import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  
  logger.error('Error occurred', {
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

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      message: `Route ${req.method} ${req.url} not found`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    }
  });
};