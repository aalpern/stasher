declare var require

const URI        = require('URIjs')
const Promise    = require('bluebird')
const hyperquest = require('hyperquest')

import {
  IClient, RequestOptions, PagedResponse
} from './client-base'

import ProjectModel from './core/project'

export enum AuthType {
  BASIC,
  OAUTH,
  COOKIE
}

export interface StashAuth {
  type: AuthType
  username?: string
  password?: string
}

export class Client implements IClient {

  private _base_url: any /* URI */
  private _auth : StashAuth
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

    list(opt?: RequestOptions) {
      return this.http_get('api', '/projects')
        .then((data) => {
          return new PagedResponse<ProjectModel>(ProjectModel, this, '/projects', data)
        })
    },

    get(key: string, opt?: RequestOptions) {
      return this.http_get('api', `/projects/${key}`)
        .then((data) => {
          return new ProjectModel(this, data)
        })
    }
  }

  /* --------------------------------------------------
     Internals
     -------------------------------------------------- */

  http_get(api: string, path: string) {
    return this._request('GET', api, path)
  }

  _url(api: string, path: string) {
    return this.base_url
      .segment('rest')
      .segment(api)
      .segment(this.version)
      .segment(path)
      .normalizePath()
  }

  _request(method: string, api: string, path: string) {
    let url = this._url(api, path)
    console.log(`${method} ${url.toString()}`)

    let headers = {}

    let opts : any = {
      method: method,
      uri: url.toString(),
      headers: headers
    }

    if (this._auth && this._auth.type === AuthType.BASIC) {
      opts.auth = `${this._auth.username}:${this._auth.password}`
    }

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
