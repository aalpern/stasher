import {
  Commit, User
} from './interfaces'

import {
  IClient
} from '../client-base'

import UserModel from './user'

export default class CommitModel implements Commit {
  id: string
  displayId: string
  author: UserModel
  authorTimestamp: number
  message: string
  parents: CommitModel[]

  private client : IClient

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

  changes() {
    // TODO - need parent entity path. Parent can be a repo or a
    // pull-request
  }

  comments() {
    // TODO - need parent entity path. Parent can be a repo or a
    // pull-request
  }
}
