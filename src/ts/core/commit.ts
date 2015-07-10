import {
  Commit, User
} from './interfaces'

import {
  IClient, RequestOptions, PagedResponse
} from '../client-base'

import UserModel   from './user'
import ChangeModel from './change'

export default class CommitModel implements Commit {
  id: string
  displayId: string
  author: UserModel
  authorTimestamp: number
  message: string
  parents: CommitModel[]

  private client : IClient
  private parent: string
  href: string

  constructor(client: IClient, data?: any) {
    this.client = client
    if (data) {
      this.id = data.id
      this.displayId = data.displayId
      if (data.author) {
        this.author = new UserModel(data.author)
      }
      this.authorTimestamp = data.authorTimestamp
      this.message = data.message
      if (data.parents) {
        this.parents = data.parents.map(p => new CommitModel(p))
      }
    }
  }

  set_parent(path: string) : CommitModel {
    this.parent = path
    this.href = `${this.parent}/commits/${this.id}`
    return this
  }

  changes(opt?: RequestOptions) {
    let path = `${this.href}/changes`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new PagedResponse<ChangeModel>((c, d) => new ChangeModel(d), this.client, path, data,
                                              undefined, opt)
      })
  }

  comments() {
  }
}
