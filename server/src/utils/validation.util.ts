import { PaginationQuery, PaginationOptions } from '../types/pagination.types';
import { paginationConfig } from '../config/pagination.config';

export const validatePaginationParams = (query: PaginationQuery) => {
  const { sort, size = paginationConfig.defaultPageSize.toString(), page = paginationConfig.defaultPage.toString() } = query;
  
  const pageSize = parseInt(size, 10);
  const pageNumber = parseInt(page, 10);
  
  if (isNaN(pageSize) || pageSize <= 0 || pageSize > paginationConfig.maxPageSize) {
    return { isValid: false, error: `Invalid page size: ${size}` };
  }
  
  if (isNaN(pageNumber) || pageNumber <= 0) {
    return { isValid: false, error: `Invalid page number: ${page}` };
  }

  const options: PaginationOptions = {
    page: pageNumber,
    size: pageSize,
  };

  if (sort) {
    const [field, order = paginationConfig.defaultSortOrder] = sort.split(':');
    if (!field || (order !== 'asc' && order !== 'desc')) {
      return { isValid: false, error: 'Invalid sort parameter' };
    }
    options.sort = { field, order };
  }

  return { isValid: true, options };
};