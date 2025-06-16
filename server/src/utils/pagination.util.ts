import { PaginationOptions, PaginationResult } from '../types/pagination.types';
import { sortArray } from './sorting.util';

export const paginateArray = <T>(
  array: T[],
  options: PaginationOptions
): PaginationResult<T> => {
  let sortedArray = array;

  if (options.sort) {
    sortedArray = sortArray(array, options.sort.field as keyof T, options.sort.order);
  }

  const totalResults = sortedArray.length;
  const totalPages = Math.ceil(totalResults / options.size);
  const startIndex = (options.page - 1) * options.size;
  const endIndex = startIndex + options.size;
  const data = sortedArray.slice(startIndex, endIndex);

  return {
    data,
    totalResults,
    page: options.page,
    size: options.size,
    totalPages,
  };
};

export const buildPaginationLinks = (
  baseUrl: string,
  result: PaginationResult<any>,
  options: PaginationOptions
) => {
  const queryParams = new URLSearchParams();
  
  if (options.sort) {
    queryParams.set('sort', `${options.sort.field}:${options.sort.order}`);
  }
  queryParams.set('size', options.size.toString());

  const links: { previous?: string; next?: string } = {};

  if (options.page > 1) {
    queryParams.set('page', (options.page - 1).toString());
    links.previous = `${baseUrl}?${queryParams.toString()}`;
  }

  if (options.page < result.totalPages) {
    queryParams.set('page', (options.page + 1).toString());
    links.next = `${baseUrl}?${queryParams.toString()}`;
  }

  return links;
};