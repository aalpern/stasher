/* -----------------------------------------------------------------------------
   Core Client types
   ----------------------------------------------------------------------------- */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PagedResponse = (function () {
    function PagedResponse(c, client, base_path, data) {
        var field = arguments[4] === undefined ? 'values' : arguments[4];

        _classCallCheck(this, PagedResponse);

        this.client = client;
        this.size = data.size;
        this.limit = data.limit;
        this.start = data.start;
        this.nextPageStart = data.nextPageStart;
        this.isLastPage = data.isLastPage;
        this.field = field;
        if (c) {
            this.values = data[field].map(function (v) {
                return c(client, v);
            });
        } else {
            this.values = data[field];
        }
    }

    _createClass(PagedResponse, [{
        key: 'nextPage',

        /**
         * Get the next page of results.
         *
         * @return Promise<PagedResponse<T>>
         */
        value: function nextPage() {}
    }]);

    return PagedResponse;
})();

exports.PagedResponse = PagedResponse;

var DefaultPagedResponse = (function (_PagedResponse) {
    function DefaultPagedResponse(client, base_path, data, field) {
        _classCallCheck(this, DefaultPagedResponse);

        _get(Object.getPrototypeOf(DefaultPagedResponse.prototype), 'constructor', this).call(this, null, client, base_path, data, field);
    }

    _inherits(DefaultPagedResponse, _PagedResponse);

    return DefaultPagedResponse;
})(PagedResponse);

exports.DefaultPagedResponse = DefaultPagedResponse;

// TODO

//# sourceMappingURL=client-base.js.map
//# sourceMappingURL=client-base.js.map