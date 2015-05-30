
/* -----------------------------------------------------------------------------
   Core Client types
   ----------------------------------------------------------------------------- */

export interface RequestOptions {
  start?: number
  limit?: number
  params?: Object
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

  constructor(c: ValueConstructorFn<T>, client: IClient, base_path: string, data: any) {
    this.client = client
    this.size = data.size
    this.limit = data.limit
    this.start = data.start
    this.nextPageStart = data.nextPageStart
    this.isLastPage = data.isLastPage
    if (c) {
      this.values = data.values.map(v => c(client, v))
    } else {
      this.values = data.values
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
  constructor(client: IClient, base_path: string, data: any) {
    super(null, client, base_path, data)
  }
}
