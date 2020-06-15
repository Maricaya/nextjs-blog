"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddCreatedAtAndUpdateAt1592206406201 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeorm = require("typeorm");

var AddCreatedAtAndUpdateAt1592206406201 = /*#__PURE__*/function () {
  function AddCreatedAtAndUpdateAt1592206406201() {
    (0, _classCallCheck2["default"])(this, AddCreatedAtAndUpdateAt1592206406201);
  }

  (0, _createClass2["default"])(AddCreatedAtAndUpdateAt1592206406201, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.addColumns('users', [new _typeorm.TableColumn({
                  name: 'createdAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                }), new _typeorm.TableColumn({
                  name: 'updateAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                })]);

              case 2:
                _context.next = 4;
                return queryRunner.addColumns('posts', [new _typeorm.TableColumn({
                  name: 'createdAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                }), new _typeorm.TableColumn({
                  name: 'updateAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                })]);

              case 4:
                _context.next = 6;
                return queryRunner.addColumns('comments', [new _typeorm.TableColumn({
                  name: 'createdAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                }), new _typeorm.TableColumn({
                  name: 'updateAt',
                  type: 'time',
                  isNullable: false,
                  "default": 'now()'
                })]);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function up(_x) {
        return _up.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return queryRunner.dropColumn('users', 'createdAt');

              case 3:
                _context2.next = 5;
                return queryRunner.dropColumn('users', 'updateAt');

              case 5:
                _context2.next = 7;
                return queryRunner.dropColumn('posts', 'createdAt');

              case 7:
                _context2.next = 9;
                return queryRunner.dropColumn('posts', 'updateAt');

              case 9:
                _context2.next = 11;
                return queryRunner.dropColumn('comments', 'createdAt');

              case 11:
                _context2.next = 13;
                return queryRunner.dropColumn('comments', 'updateAt');

              case 13:
                _context2.next = 17;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15]]);
      }));

      function down(_x2) {
        return _down.apply(this, arguments);
      }

      return down;
    }()
  }]);
  return AddCreatedAtAndUpdateAt1592206406201;
}();

exports.AddCreatedAtAndUpdateAt1592206406201 = AddCreatedAtAndUpdateAt1592206406201;