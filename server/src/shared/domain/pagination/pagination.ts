
export namespace Pagination {
  export interface Input {
    page: number;
    limitPerPage: number;
  }

  export interface Output<T> {
    pagination: {
      currentPage: number;
      limitPerPage: number;
      totalPages: number;
      totalCount: number;
    }
    data: T[];
  }
}