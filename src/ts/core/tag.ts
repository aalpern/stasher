import {
  Tag
} from './interfaces'

export default class TagModel implements Tag {
  id: string
  displayId: string
  latestChangeset: string
  latestCommit: string
  hash: string

  constructor(data?: any) {
    if (data) {
      this.id = data.id
      this.displayId = data.displayId
      this.latestChangeset = data.latestChangeset
      this.latestCommit = data.latestCommit
      this.hash = data.hash
    }
  }
}
