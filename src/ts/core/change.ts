import {
  Change, Path
} from './interfaces'

import {
  IClient, RequestOptions, PagedResponse
} from '../client-base'

import EntityModel from './entity'

export default class ChangeModel extends EntityModel implements Change {
  contentId: string
  fromContentId: string
  path: Path
  executable: boolean
  percentUnchanged: number
  type: string
  nodeType: string
  srcPath: Path
  srcExecutable: boolean

  constructor(data?: any) {
    super(data)
    if (data) {
      this.contentId = data.contentId
      this.fromContentId = data.fromContentId
      this.path = data.path
      this.executable = data.executable
      this.percentUnchanged = data.percentUnchanged
      this.type = data.type
      this.nodeType = data.nodeType
      this.srcPath = data.srcPath
      this.srcExecutable = data.srcExecutable
    }
  }
}
