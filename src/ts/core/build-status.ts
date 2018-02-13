import {BuildStatus, Commit} from './interfaces'
import {
    IClient, RequestOptions, PagedResponse
} from '../client-base'

export default class BuildStatusModel implements BuildStatus {
  state: string
  key: string
  name: string
  url: string
  description: string
  dateAdded: number

  private client : IClient

  constructor(client: IClient, data?: any) {
        this.client = client
        if (data) {
            this.state = data.state
            this.key = data.key
            this.name = data.name
            this.url = data.url
            this.dateAdded = data.dateAdded
        }
    }
}
