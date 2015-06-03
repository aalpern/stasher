
/* -----------------------------------------------------------------------------
   Core Client types
   ----------------------------------------------------------------------------- */

export interface RequestOptions {
  start?: number
  limit?: number
}

export interface IClient {
  http_get(api: string, path: string, opt?: RequestOptions)
}

export interface ValueConstructorFn<T> {
  (client: IClient, data: any) : T
}

export class PagedResponse<T> {
  values: T[]
  size: number
  limit: number
  start: number
  nextPageStart: number
  isLastPage: boolean

  private client: IClient
  private base_path: string
  private field: string

  constructor(c: ValueConstructorFn<T>, client: IClient, base_path: string, data: any, field: string = 'values') {
    this.client = client
    this.size = data.size
    this.limit = data.limit
    this.start = data.start
    this.nextPageStart = data.nextPageStart
    this.isLastPage = data.isLastPage
    this.field = field
    if (c) {
      this.values = data[field].map(v => c(client, v))
    } else {
      this.values = data[field]
    }
  }

  /**
   * Get the next page of results.
   *
   * @return Promise<PagedResponse<T>>
   */
  nextPage() {
    // TODO
  }
}

export class DefaultPagedResponse extends PagedResponse<any> {
  constructor(client: IClient, base_path: string, data: any, field?: string) {
    super(null, client, base_path, data, field)
  }
}
