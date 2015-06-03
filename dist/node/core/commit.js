'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clientBase = require('../client-base');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _change = require('./change');

var _change2 = _interopRequireDefault(_change);

var CommitModel = (function () {
    function CommitModel(client, data) {
        _classCallCheck(this, CommitModel);

        this.client = client;
        if (data) {
            this.id = data.id;
            this.displayId = data.displayId;
            if (data.author) {
                this.author = new _user2['default'](data.author);
            }
            this.authorTimestamp = data.authorTimestamp;
            this.message = data.message;
            if (data.parents) {
                this.parents = data.parents.map(function (p) {
                    return new CommitModel(p);
                });
            }
        }
    }

    _createClass(CommitModel, [{
        key: 'set_parent',
        value: function set_parent(path) {
            this.parent = path;
            this.href = '' + this.parent + '/commits/' + this.id;
            return this;
        }
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
    }]);

    return CommitModel;
})();

exports['default'] = CommitModel;
module.exports = exports['default'];

//# sourceMappingURL=commit.js.map
//# sourceMappingURL=commit.js.map