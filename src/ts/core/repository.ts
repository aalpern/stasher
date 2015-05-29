import {
  Repository, Relation, LinkDictionary
} from './interfaces'

import {
  Client,
  RequestOptions,
  PagedResponse
} from '../client'

import ProjectModel from './project'
import PullRequestModel from './pull-request'

export default class RepositoryModel implements Repository {
  id: number
  slug: string
  name: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  project: ProjectModel
  public: boolean
  cloneUrl: string
  link: Relation
  links: LinkDictionary

  private client: Client

  constructor(client: Client, data?: any) {
    this.client = client
    if (data) {
      this.id = data.id
      this.slug = data.slug
      this.name = data.name
      this.scmId = data.scmId
      this.state = data.state
      this.statusMessage = data.statusMessage
      this.forkable = data.forkable
      if (data.project) {
        this.project = new ProjectModel(data.project)
      }
      this.link = data.link
      this.links = data.links
    }
  }

  forks(opt?: RequestOptions) {
  }

  related(opt?: RequestOptions) {
  }

  branches(opt?: RequestOptions) {
  }

  default_branch(opt?: RequestOptions) {
  }

  changes(opt?: RequestOptions) {
  }

  commits(opt?: RequestOptions) {
  }

  commit(id: string, opt?: RequestOptions) {
  }

  files(opt?: RequestOptions) {
  }

  pull_requests(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/pull-requests`
    return this.client.http_get('api', path)
      .then((data) => {
        return new PagedResponse<PullRequestModel>(PullRequestModel, this.client, path, data)
      })
  }

  pull_request(id: string, opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/pull-requests/${id}`
    return this.client.http_get('api', path)
      .then((data) => {
        return new PullRequestModel(this.client, data)
      })
  }
}
