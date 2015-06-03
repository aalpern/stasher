'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clientBase = require('./client-base');

var _coreProject = require('./core/project');

var _coreProject2 = _interopRequireDefault(_coreProject);

var _coreRepository = require('./core/repository');

var _coreRepository2 = _interopRequireDefault(_coreRepository);

var _coreUser = require('./core/user');

var _coreUser2 = _interopRequireDefault(_coreUser);

var URI = require('URIjs');
var Promise = require('bluebird');
var request = require('superagent');
var AuthType;
exports.AuthType = AuthType;
(function (AuthType) {
    AuthType[AuthType['BASIC'] = 0] = 'BASIC';
    AuthType[AuthType['OAUTH'] = 1] = 'OAUTH';
    AuthType[AuthType['COOKIE'] = 2] = 'COOKIE';
})(AuthType || (exports.AuthType = AuthType = {}));

var Client = (function () {
    function Client(data) {
        _classCallCheck(this, Client);

        this.version = '1.0';
        /* --------------------------------------------------
           Core API
           -------------------------------------------------- */
        this.projects = {
            __proto__: this,
            list: function list(opt) {
                var _this = this;

                var path = '/projects';
                return this.http_get('api', path, opt).then(function (data) {
                    return new _clientBase.PagedResponse(function (c, d) {
                        return new _coreProject2['default'](c, d);
                    }, _this, path, data);
                });
            },
            get: function get(key) {
                var _this2 = this;

                return this.http_get('api', '/projects/' + key).then(function (data) {
                    return new _coreProject2['default'](_this2, data);
                });
            }
        };
        this.repositories = {
            __proto__: this,
            get: function get(project, repo) {
                var _this3 = this;

                return this.http_get('api', '/projects/' + project + '/repos/' + repo).then(function (data) {
                    return new _coreRepository2['default'](_this3, data);
                });
            }
        };
        this.profile = {
            __proto__: this,
            recent_repos: function recent_repos(opt) {
                var _this4 = this;

                var path = '/profile/recent/repos';
                return this.http_get('api', path, opt).then(function (data) {
                    return new _clientBase.PagedResponse(function (c, d) {
                        return new _coreRepository2['default'](c, d);
                    }, _this4, path, data);
                });
            }
        };
        this.users = {
            __proto__: this,
            list: function list(opt) {
                var _this5 = this;

                var path = '/users';
                return this.http_get('api', path, opt).then(function (data) {
                    return new _clientBase.PagedResponse(function (c, d) {
                        return new _coreUser2['default'](d);
                    }, _this5, path, data);
                });
            },
            get: function get(slug) {
                return this.http_get('api', '/users/' + slug).then(function (data) {
                    return new _coreUser2['default'](data);
                });
            }
        };
        if (data && typeof data === 'string') {
            this._base_url = new URI(data);
        } else if (data && data instanceof URI) {
            this._base_url = data;
        } else if (data) {
            if (data.base_url) {
                this._base_url = new URI(data.base_url);
            }
            this._auth = data.auth;
            this.version = data.version || this.version;
        }
    }

    _createClass(Client, [{
        key: 'base_url',
        get: function () {
            return this._base_url.clone();
        }
    }, {
        key: 'http_get',

        /* --------------------------------------------------
           Internals
           -------------------------------------------------- */
        value: function http_get(api, path, options) {
            return this._request('GET', api, path, options);
        }
    }, {
        key: '_url',
        value: function _url(api, path) {
            return this.base_url.segment('rest').segment(api).segment(this.version).segment(path).normalizePath();
        }
    }, {
        key: '_request',
        value: function _request(method, api, path, options) {
            var url = this._url(api, path);
            var req = request(method, url.toString());
            if (method === 'GET' && options) {
                req.query(options);
            }
            if (this._auth && this._auth.type === AuthType.BASIC) {
                req.auth(this._auth.username, this._auth.password);
            }
            return new Promise(function (resolve, reject) {
                req.end(function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.body);
                    }
                });
            });
        }
    }]);

    return Client;
})();

exports.Client = Client;

//# sourceMappingURL=client.js.map
//# sourceMappingURL=client.js.map