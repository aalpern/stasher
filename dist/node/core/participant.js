'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var ParticipantModel = function ParticipantModel(data) {
    _classCallCheck(this, ParticipantModel);

    if (data) {
        this.user = new _user2['default'](data.user);
        this.role = data.role;
        this.approved = data.approved;
    }
};

exports['default'] = ParticipantModel;
module.exports = exports['default'];

//# sourceMappingURL=participant.js.map
//# sourceMappingURL=participant.js.map