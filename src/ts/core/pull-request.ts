import {
  Client, RequestOptions, PagedResponse
} from '../client'

import {
  PullRequest, BranchReference, PullRequestParticipant
} from './interfaces'

import EntityModel from './entity'

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
  author: PullRequestParticipant
  reviewers: PullRequestParticipant[]
  participants: PullRequestParticipant[]

  constructor(client: Client, data?: any) {
    super(data)
    if (data) {
    }
  }
}
