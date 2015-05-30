declare var require

const URI        = require('URIjs')
const Promise    = require('bluebird')
const hyperquest = require('hyperquest')

import {
  IClient, RequestOptions, PagedResponse
} from './client-base'

import ProjectModel from './core/project'
import RepositoryModel from './core/repository'
import UserModel from './core/user'

export enum AuthType {
  BASIC,
  OAUTH,
  COOKIE
}

export interface Auth {
  type: AuthType
  username?: string
  password?: string
}

export interface ProjectListOptions extends RequestOptions {
  name?: string
  permission?: string
}

export class Client implements IClient {

  private _base_url: any /* URI */
  private _auth : Auth
  version: string = '1.0'

  constructor(data?: any) {
    if (data && typeof data === 'string') {
      this._base_url = new URI(data)

    } else if (data && data instanceof URI) {
      this._base_url = data

    } else if (data) {
      if (data.base_url) {
        this._base_url = new URI(data.base_url)
      }
      this._auth = data.auth
      this.version = data.version || this.version
    }
  }

  get base_url() {
    return this._base_url.clone()
  }


  /* --------------------------------------------------
     Core API
     -------------------------------------------------- */

  projects = {
    __proto__: this,

    list(opt?: ProjectListOptions) {
      let path = '/projects'
      return this.http_get('api', path, opt)
        .then((data) => {
          return new PagedResponse<ProjectModel>((c, d) => new ProjectModel(c, d), this, path, data)
        })
    },

    get(key: string) {
      return this.http_get('api', `/projects/${key}`)
        .then((data) => {
          return new ProjectModel(this, data)
        })
    }
  }

  repositories = {
    __proto__: this,

    get(project: string, repo: string) {
      return this.http_get('api', `/projects/${project}/repos/${repo}`)
        .then((data) => {
          return new RepositoryModel(this, data)
        })
    }
  }

  profile = {
    __proto__: this,

    recent_repos(opt?: RequestOptions) {
      let path = '/profile/recent/repos'
      return this.http_get('api', path, opt)
        .then((data) => {
          return new PagedResponse<RepositoryModel>((c, d) => new RepositoryModel(c, d), this, path, data)
        })
    }
  }

  users = {
    __proto__: this,

    list(opt?: RequestOptions) {
      let path = '/users'
      return this.http_get('api', path, opt)
        .then((data) => {
          return new PagedResponse<UserModel>((c, d) => new UserModel(d), this, path, data)
        })
    },

    get(slug: string) {
      return this.http_get('api', `/users/${slug}`)
        .then((data) => {
          return new UserModel(data)
        })
    }
  }

  /* --------------------------------------------------
     Internals
     -------------------------------------------------- */

  http_get(api: string, path: string, options?: RequestOptions) {
    return this._request('GET', api, path, options)
  }

  _url(api: string, path: string) {
    return this.base_url
      .segment('rest')
      .segment(api)
      .segment(this.version)
      .segment(path)
      .normalizePath()
  }

  _request(method: string, api: string, path: string, options?: RequestOptions) {
    let url = this._url(api, path)

    if (method === 'GET' && options) {
      url.setSearch(options)
    }

    let headers = {}

    let opts : any = {
      method: method,
      uri: url.toString(),
      headers: headers
    }

    if (this._auth && this._auth.type === AuthType.BASIC) {
      opts.auth = `${this._auth.username}:${this._auth.password}`
    }

    console.log(`${method} ${url.toString()}`)

    return new Promise((resolve, reject) => {
      let body = ''
      let req = hyperquest(opts)
      req
        .on('data', (buffer) => {
          body += buffer.toString()
        })
        .on('end', () => {
          try {
            let data= JSON.parse(body)
            resolve(data)
          } catch (e) {
            reject({
              exception: e,
              body: body
            })
          }
        })
        .on('error', (e) => {
          reject(e)
        })
    })
  }
}
