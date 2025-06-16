import express, { Request, Response } from 'express';
import { PaginationQuery, PaginatedResponse } from '../types/pagination.types';
import { User } from '../types/user.types';
import { validatePaginationParams } from '../utils/validation.util';
import { buildPaginationLinks } from '../utils/pagination.util';
import { userService } from '../services/user.service';
import logger from '../config/logger';

const router = express.Router();

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
router.get('/', (req: Request<{}, {}, {}, PaginationQuery>, res: Response<PaginatedResponse<User>>) => {
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
});

export default router;