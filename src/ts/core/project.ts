import {
  Project, Relation, LinkDictionary
} from './interfaces'

import {
  IClient, RequestOptions, PagedResponse
} from '../client-base'

import RepositoryModel from './repository'

export default class ProjectModel implements Project {
  id: number
  key: string
  name: string
  description: string
  public: boolean
  type: string
  link: Relation
  links: LinkDictionary

  private client : IClient

  constructor(client: IClient, data?: any) {
    this.client = client
    if (data) {
      this.id = data.id
      this.key = data.key
      this.name = data.name
      this.description = data.description
      this.public = data.public
      this.type = data.type
      this.link = data.link
      this.links = data.links
    }
  }

  /**
   * @returns Promise<PagedResponse<Repository>>
   */
  repositories(opt?: RequestOptions) {
    let path = `/projects/${this.key}/repos`
    return this.client.http_get('api', path, opt)
      .then((data) => {
        return new PagedResponse<RepositoryModel>((c, d) => new RepositoryModel(c, d), this.client, path, data)
      })
  }

  /**
   * @returns Promise<Repository>
   */
  repository(slug: string) {
    return this.client.http_get('api', `/projects/${this.key}/repos/${slug}`)
      .then((data) => {
        return new RepositoryModel(this.client, data)
      })
  }
}
