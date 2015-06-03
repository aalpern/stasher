'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _clientBase = require('../client-base');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _participant = require('./participant');

var _participant2 = _interopRequireDefault(_participant);

var _change = require('./change');

var _change2 = _interopRequireDefault(_change);

var _commit = require('./commit');

var _commit2 = _interopRequireDefault(_commit);

var PullRequestModel = (function (_EntityModel) {
    function PullRequestModel(client, data) {
        _classCallCheck(this, PullRequestModel);

        _get(Object.getPrototypeOf(PullRequestModel.prototype), 'constructor', this).call(this, data);
        this.client = client;
        if (data) {
            this.id = data.id;
            this.version = data.version;
            this.title = data.title;
            this.descripion = data.descripion;
            this.state = data.state;
            this.open = data.open;
            this.closed = data.closed;
            this.createdDate = data.createdDate;
            this.updatedDate = data.updatedDate;
            this.fromRef = data.fromRef;
            this.toRef = data.toRef;
            this.locked = data.locked;
            if (data.author) {
                this.author = new _participant2['default'](data.author);
            }
            if (data.reviewers) {
                this.reviewers = data.reviewers.map(function (r) {
                    return new _participant2['default'](r);
                });
            }
            if (data.participants) {
                this.participants = data.participants.map(function (p) {
                    return new _participant2['default'](p);
                });
            }
        }
    }

    _inherits(PullRequestModel, _EntityModel);

    _createClass(PullRequestModel, [{
        key: 'set_parent',
        value: function set_parent(path) {
            this.parent = path;
            this.href = '' + this.parent + '/pull-requests/' + this.id;
            return this;
        }
    }, {
        key: 'activities',
        value: function activities() {}
    }, {
        key: 'changes',
        value: function changes(opt) {
            var _this = this;

            var path = '' + this.href + '/changes';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new _change2['default'](d);
                }, _this.client, path, data);
            });
        }
    }, {
        key: 'comments',
        value: function comments() {}
    }, {
        key: 'commits',
        value: function commits(opt) {
            var _this2 = this;

            var path = '' + this.href + '/commits';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new _commit2['default'](c, d).set_parent(_this2.href);
                }, _this2.client, path, data);
            });
        }
    }, {
        key: 'diff',
        value: function diff() {}
    }]);

    return PullRequestModel;
})(_entity2['default']);

exports['default'] = PullRequestModel;
module.exports = exports['default'];

//# sourceMappingURL=pull-request.js.map
//# sourceMappingURL=pull-request.js.map