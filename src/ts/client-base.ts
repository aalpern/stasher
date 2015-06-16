
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
  private ctor: ValueConstructorFn<T>

  constructor(ctor: ValueConstructorFn<T>, client: IClient, base_path: string, data: any, field: string = 'values') {
    this.ctor = ctor
    this.client = client
    this.base_path = base_path
    this.size = data.size
    this.limit = data.limit
    this.start = data.start
    this.nextPageStart = data.nextPageStart
    this.isLastPage = data.isLastPage
    this.field = field
    if (ctor) {
      this.values = data[field].map(v => ctor(client, v))
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
    if (this.isLastPage) {
      throw new RangeError('No more pages.')
    }
    // TODO: the 'api' parameter needs to be a member too, has to
    // bubble up to everywhere a PagedResponse is constructed
    return this.client.http_get('api', this.base_path, {
      limit: this.limit,
      start: this.nextPageStart
    }).then(data => {
      return new PagedResponse<T>(this.ctor, this.client, this.base_path, data)
    })
  }
}

export class DefaultPagedResponse extends PagedResponse<any> {
  constructor(client: IClient, base_path: string, data: any, field?: string) {
    super(null, client, base_path, data, field)
  }
}
