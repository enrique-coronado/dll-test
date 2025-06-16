export interface PaginationQuery {
  sort?: string;
  size?: string;
  page?: string;
}

export interface PaginationOptions {
  page: number;
  size: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface PaginationResult<T> {
  data: T[];
  totalResults: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  paging: {
    totalResults: number;
    previous?: string;
    next?: string;
  };
}