import {
  Repository, Relation, LinkDictionary
} from './interfaces'

import {
  IClient, RequestOptions, PagedResponse, DefaultPagedResponse
} from '../client-base'

import EntityModel      from './entity'
import ProjectModel     from './project'
import PullRequestModel from './pull-request'
import ChangeModel      from './change'
import CommitModel      from './commit'

export interface ChangesOptions extends RequestOptions {
  since?: string
  until: string
}

export interface CommitOptions extends RequestOptions {
  /* Optional path to filter commits by. */
  path?: string
}

export interface CommitListOptions extends RequestOptions {
  /* Optional path to filter commits by. */
  path?: string
  /** Commit ID or ref to include commits after (exclusive). */
  since?: string
  /** Commit ID or ref to include commits before (inclusive). */
  until?: string
  /** Include total # of commits and authors in response. */
  withCounts?: boolean
}

export interface BranchOptions extends RequestOptions {
  /** Base branch or tag. */
  base?: string
  /** Include branch metadata or not. */
  details?: boolean
  /** String to match branch names on. */
  filterText?: string
  /** Ordering by "ALPHABETICAL" (on branch name) or "MODIFICATION"
   * (last updated time). */
  orderBy?: string
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

  related(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/related`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new PagedResponse<Repository>((c, d) => new RepositoryModel(c, d), this.client, path, data)
      })
  }

  branches(opt?: BranchOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/branches`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new DefaultPagedResponse(this.client, path, data)
      })
  }

  default_branch() {
    let path = `/projects/${this.project.key}/repos/${this.slug}/branches/default`
    return this.client.http_get('api', path)
  }

  changes(opt?: ChangesOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/changes`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new PagedResponse<ChangeModel>((c, d) => new ChangeModel(c, d), this.client, path, data)
      })
  }

  commits(opt?: CommitListOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/commits`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new PagedResponse<CommitModel>((c, d) => new CommitModel(c, d).set_parent(this.href),
                                              this.client, path, data)
      })
  }

  commit(id: string, opt?: CommitOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/commits/${id}`
    return this.client.http_get('api', path, opt)
  }

  files(opt?: RequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/files`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new DefaultPagedResponse(this.client, path, data)
      })
  }

  pull_requests(opt?: PullRequestOptions) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/pull-requests`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new PagedResponse<PullRequestModel>((c, d) => new PullRequestModel(c, d).set_parent(this.href),
                                                   this.client, path, data)
      })
  }

  pull_request(id: string) {
    let path = `/projects/${this.project.key}/repos/${this.slug}/pull-requests/${id}`
    return this.client.http_get('api', path)
      .then((data) => {
        return new PullRequestModel(this.client, data)
      })
  }
}
