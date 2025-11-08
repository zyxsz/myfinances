

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    limitPerPage: number;
    totalCount: number;
    totalPages: number;
  }
}