import {
  PullRequest, BranchReference, Participant
} from './interfaces'

import {
  IClient, RequestOptions, PagedResponse
} from '../client-base'

import EntityModel from './entity'
import ParticipantModel from './participant'

export default class PullRequestModel extends EntityModel implements PullRequest {
  id: number
  version: number
  title: string
  descripion: string
  state: string
  open: boolean
  closed: boolean
  createdDate: number
  updatedDate: number
  fromRef: BranchReference
  toRef: BranchReference
  locked: boolean
  author: ParticipantModel
  reviewers: ParticipantModel[]
  participants: ParticipantModel[]

  private client : IClient
  private parent : string

  constructor(client: IClient, data?: any) {
    super(data)
    this.client = client
    if (data) {
      this.id = data.id
      this.version = data.version
      this.title = data.title
      this.descripion = data.descripion
      this.state = data.state
      this.open = data.open
      this.closed = data.closed
      this.createdDate = data.createdDate
      this.updatedDate = data.updatedDate
      this.fromRef = data.fromRef
      this.toRef = data.toRef
      this.locked = data.locked
      if (data.author) {
        this.author = new ParticipantModel(data.author)
      }
      if (data.reviewers) {
        this.reviewers = data.reviewers.map(r => new ParticipantModel(r))
      }
      if (data.participants) {
        this.participants = data.participants.map(p => new ParticipantModel(p))
      }
    }
  }

  set_parent(path: string) : PullRequestModel {
    this.parent = path
    return this
  }

  activities() {
  }

  changes() {
  }

  commits() {
  }

  diff() {
  }
}
