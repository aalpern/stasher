import {
  Fork
} from './interfaces'

import {
  IClient
} from '../client-base'

import RepositoryModel from './repository'

export default class ForkModel extends RepositoryModel implements Fork {
  origin: RepositoryModel

  constructor(client: IClient, data?: any) {
    super(client, data)
    if (data && data.origin) {
      this.origin = new RepositoryModel(client, data.origin)
    }
  }
}
