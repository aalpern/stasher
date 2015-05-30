import {
  Repository, Relation, LinkDictionary
} from './interfaces'

import {
  IClient, RequestOptions, PagedResponse, DefaultPagedResponse
} from '../client-base'

import EntityModel from './entity'
import ProjectModel from './project'
import PullRequestModel from './pull-request'
import ChangeModel from './change'

export interface ChangesOptions extends RequestOptions {
  since?: string
  until: string
}

export interface PullRequestOptions extends RequestOptions {
  /** One of "ALL", "OPEN", "DECLINED", or "MERGED". Defaults to "OPEN". */
  state?: string
  /** One of "INCOMING" or "OUTGOING". Defaults to "INCOMING". */
  direction?: string
  at?: string
  /** One of "OLDEST" or "NEWEST". */
  order?: string
  /** Defaults to true. */
  withAttributes: boolean
  /** Defaults to true. */
  withProperties: boolean
}

export default class RepositoryModel extends EntityModel implements Repository {
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

  href: string
  private client: IClient

  constructor(client: IClient, data?: any) {
    super(data)
    this.client = client
    if (data) {
      this.id = data.id
      this.slug = data.slug
      this.name = data.name
      this.scmId = data.scmId
      this.state = data.state
      this.statusMessage = data.statusMessage
      this.forkable = data.forkable
      this.project = new ProjectModel(client, data.project)
      this.link = data.link
      this.links = data.links
      this.href = `/projects/${this.project.key}/repos/${this.slug}`
    }
  }

  forks(opt?: RequestOptions) {
  }

  related(opt?: RequestOptions) {
  }

  branches(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/branches`
    return this.client.http_get('api', path)
      .then((data) => {
        return new DefaultPagedResponse(this.client, path, data)
      })
  }

  default_branch(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/branches/default`
    return this.client.http_get('api', path)
  }

  changes(opt?: ChangesOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/changes`
    let params = {
      since: opt ? opt.since : undefined,
      until: opt ? opt.until : undefined
    }
    return this.client.http_get('api', path, {
      params: params
    }).then((data) => {
      return new PagedResponse<ChangeModel>((c, d) => new ChangeModel(c, d), this.client, path, data)
    })
  }

  commits(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/commits`
    return this.client.http_get('api', path)
      .then((data) => {
        return new DefaultPagedResponse(this.client, path, data)
      })
  }

  commit(id: string, opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/commits/${id}`
    return this.client.http_get('api', path)
  }

  files(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/files`
    return this.client.http_get('api', path)
      .then((data) => {
        return new DefaultPagedResponse(this.client, path, data)
      })
  }

  pull_requests(opt?: PullRequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/pull-requests`
    let params = {
      state: opt ? opt.state : undefined,
      direction: opt ? opt.direction : undefined,
      at: opt ? opt.at : undefined,
      order: opt ? opt.order : undefined,
      withAttributes: opt ? opt.withAttributes : undefined,
      withProperties: opt ? opt.withProperties : undefined
    }
    return this.client.http_get('api', path, {
      params: params
    }).then((data) => {
      return new PagedResponse<PullRequestModel>((c, d) => new PullRequestModel(c, d).set_parent(this.href),
                                                 this.client, path, data)
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
