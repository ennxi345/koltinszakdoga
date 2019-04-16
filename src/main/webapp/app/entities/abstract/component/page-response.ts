export class PageResponse<T> {
    page: { size: number; totalElements: number; totalPages: number; number: number };
    _embedded: any;
    _links: any;
}
