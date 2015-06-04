'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dependencies = require('../dependencies');

var _clientBase = require('../client-base');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _project = require('./project');

var _project2 = _interopRequireDefault(_project);

var _pullRequest = require('./pull-request');

var _pullRequest2 = _interopRequireDefault(_pullRequest);

var _change = require('./change');

var _change2 = _interopRequireDefault(_change);

var _commit = require('./commit');

var _commit2 = _interopRequireDefault(_commit);

var RepositoryModel = (function (_EntityModel) {
    function RepositoryModel(client, data) {
        _classCallCheck(this, RepositoryModel);

        _get(Object.getPrototypeOf(RepositoryModel.prototype), 'constructor', this).call(this, data);
        this.client = client;
        if (data) {
            this.id = data.id;
            this.slug = data.slug;
            this.name = data.name;
            this.scmId = data.scmId;
            this.state = data.state;
            this.statusMessage = data.statusMessage;
            this.forkable = data.forkable;
            this.project = new _project2['default'](client, data.project);
            this.link = data.link;
            this.links = data.links;
            this.href = '/projects/' + this.project.key + '/repos/' + this.slug;
        }
    }

    _inherits(RepositoryModel, _EntityModel);

    _createClass(RepositoryModel, [{
        key: 'related',
        value: function related(opt) {
            var _this = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/related';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new RepositoryModel(c, d);
                }, _this.client, path, data);
            });
        }
    }, {
        key: 'branches',
        value: function branches(opt) {
            var _this2 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/branches';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.DefaultPagedResponse(_this2.client, path, data);
            });
        }
    }, {
        key: 'default_branch',
        value: function default_branch() {
            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/branches/default';
            return this.client.http_get('api', path);
        }
    }, {
        key: 'changes',
        value: function changes(opt) {
            var _this3 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/changes';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new _change2['default'](d);
                }, _this3.client, path, data);
            });
        }
    }, {
        key: 'commits',
        value: function commits(opt) {
            var _this4 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/commits';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new _commit2['default'](c, d).set_parent(_this4.href);
                }, _this4.client, path, data);
            });
        }
    }, {
        key: 'commit',
        value: function commit(id, opt) {
            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/commits/' + id;
            return this.client.http_get('api', path, opt);
        }
    }, {
        key: 'files',
        value: function files(opt) {
            var _this5 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/files';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.DefaultPagedResponse(_this5.client, path, data);
            });
        }
    }, {
        key: 'browse',
        value: function browse(opt) {
            var _this6 = this;

            var path = new _dependencies.URI('/projects/' + this.project.key + '/repos/' + this.slug + '/browse');
            if (opt && opt.path) {
                path.segment(opt.path).normalizePath();
                opt.path = undefined; /* prevent it from being added to query string too */
            }
            return this.client.http_get('api', path.toString(), opt).then(function (data) {
                return new _clientBase.DefaultPagedResponse(_this6.client, path, data, 'lines');
            });
        }
    }, {
        key: 'pull_requests',
        value: function pull_requests(opt) {
            var _this7 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/pull-requests';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new _pullRequest2['default'](c, d).set_parent(_this7.href);
                }, _this7.client, path, data);
            });
        }
    }, {
        key: 'pull_request',
        value: function pull_request(id) {
            var _this8 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/pull-requests/' + id;
            return this.client.http_get('api', path).then(function (data) {
                return new _pullRequest2['default'](_this8.client, data).set_parent(_this8.href);
            });
        }
    }]);

    return RepositoryModel;
})(_entity2['default']);

exports['default'] = RepositoryModel;
module.exports = exports['default'];

//# sourceMappingURL=repository.js.map
//# sourceMappingURL=repository.js.map