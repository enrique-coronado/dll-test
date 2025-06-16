import { Request, Response } from 'express';
import { PaginationQuery, PaginatedResponse } from '../types/pagination.types';
import { User } from '../types/user.types';
import { validatePaginationParams } from '../utils/validation.util';
import { buildPaginationLinks } from '../utils/pagination.util';
import { userService } from '../services/user.service';
import logger from '../config/logger';

export class UserController {
  /**
   * Retrieves a paginated list of users with optional sorting
   * @param req - Express request object containing pagination query parameters
   * @param res - Express response object for sending the paginated user data
   * @returns Promise that resolves when response is sent
   */
  async getUsers(req: Request<{}, {}, {}, PaginationQuery>, res: Response<PaginatedResponse<User>>) {
    logger.info('GET /users', { 
      query: req.query,
      ip: req.ip 
    });
    
    const validation = validatePaginationParams(req.query);
    
    if (!validation.isValid) {
      logger.warn('Invalid pagination parameters', { 
        error: validation.error,
        query: req.query 
      });
      return res.status(400).json({
        data: [],
        paging: { totalResults: 0 }
      });
    }

    const result = userService.getPaginatedUsers(validation.options!);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const links = buildPaginationLinks(baseUrl, result, validation.options!);

    logger.info('Users retrieved successfully', {
      returned: result.data.length,
      total: result.totalResults,
      page: validation.options!.page,
      size: validation.options!.size
    });
    
    res.json({
      data: result.data,
      paging: {
        totalResults: result.totalResults,
        ...links
      }
    });
  }
}

export const userController = new UserController();