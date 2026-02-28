export interface PaginationParams {
    page?: number | undefined,
    limit?: number | undefined,
}

export interface PaginationResponse<T> {
    data: T[],
    page: number,
    totalPages: number,
    totalItems: number
}