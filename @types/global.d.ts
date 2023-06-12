export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type CreationAttributes = Optional<T, 'id'>
export type Pagination<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}
export type PaginationReq = {
  limit: number;
  offset: number;
}
