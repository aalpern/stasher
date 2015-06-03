'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clientBase = require('../client-base');

var _repository = require('./repository');

var _repository2 = _interopRequireDefault(_repository);

var ProjectModel = (function () {
    function ProjectModel(client, data) {
        _classCallCheck(this, ProjectModel);

        this.client = client;
        if (data) {
            this.id = data.id;
            this.key = data.key;
            this.name = data.name;
            this.description = data.description;
            this['public'] = data['public'];
            this.type = data.type;
            this.link = data.link;
            this.links = data.links;
        }
    }

    _createClass(ProjectModel, [{
        key: 'repositories',

        /**
         * @returns Promise<PagedResponse<Repository>>
         */
        value: function repositories(opt) {
            var _this = this;

            var path = '/projects/' + this.key + '/repos';
            return this.client.http_get('api', path, opt).then(function (data) {
                return new _clientBase.PagedResponse(function (c, d) {
                    return new _repository2['default'](c, d);
                }, _this.client, path, data);
            });
        }
    }, {
        key: 'repository',

        /**
         * @returns Promise<Repository>
         */
        value: function repository(slug) {
            var _this2 = this;

            return this.client.http_get('api', '/projects/' + this.key + '/repos/' + slug).then(function (data) {
                return new _repository2['default'](_this2.client, data);
            });
        }
    }]);

    return ProjectModel;
})();

exports['default'] = ProjectModel;
module.exports = exports['default'];

//# sourceMappingURL=project.js.map
//# sourceMappingURL=project.js.map