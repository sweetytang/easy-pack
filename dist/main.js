(function (__modules) {
      const installedModules = {};
      function __easypack_require__ (filename) {
        if (installedModules[filename]) {
          return installedModules[filename].exports;
        }
        const module = installedModules[filename] = { exports: {} };
        __modules[filename](module, module.exports, __easypack_require__);
        return module.exports;
      }
      __easypack_require__('/Users/sweetang/Desktop/easy-pack/src/index.js');
    })({'/Users/sweetang/Desktop/easy-pack/src/index.js': function (module, exports, require) {"use strict";

var _greeting = require("./greeting.js");
document.write((0, _greeting.greeting)('easypack'));},'./greeting.js': function (module, exports, require) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'greeting ' + name;
}},})