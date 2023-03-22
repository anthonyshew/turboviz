"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/build-graph";
exports.ids = ["pages/api/build-graph"];
exports.modules = {

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "(api)/./pages/api/build-graph.ts":
/*!**********************************!*\
  !*** ./pages/api/build-graph.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction handler(req, res) {\n    const taskName = req.body.taskName;\n    const graph = (0,child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(`turbo ${taskName} --dry=json`);\n    const result = JSON.parse(graph.toString()).tasks;\n    return res.status(200).json(result);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYnVpbGQtZ3JhcGgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdDO0FBSXpCLFNBQVNDLFFBQVFDLEdBQW1CLEVBQUVDLEdBQTRDLEVBQUU7SUFDakcsTUFBTUMsV0FBV0YsSUFBSUcsSUFBSSxDQUFDRCxRQUFRO0lBQ2xDLE1BQU1FLFFBQVFOLHVEQUFRQSxDQUFDLENBQUMsTUFBTSxFQUFFSSxTQUFTLFdBQVcsQ0FBQztJQUNyRCxNQUFNRyxTQUFTQyxLQUFLQyxLQUFLLENBQUNILE1BQU1JLFFBQVEsSUFBSUMsS0FBSztJQUVqRCxPQUFPUixJQUFJUyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDTjtBQUM5QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGFzaGV3L2hlbGxvLXdvcmxkLy4vcGFnZXMvYXBpL2J1aWxkLWdyYXBoLnRzP2MxN2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiXG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIlxuaW1wb3J0IHsgVHVyYm90YXNrIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZTx7IHRhc2tzOiBUdXJib3Rhc2tbXSB9Pikge1xuICBjb25zdCB0YXNrTmFtZSA9IHJlcS5ib2R5LnRhc2tOYW1lXG4gIGNvbnN0IGdyYXBoID0gZXhlY1N5bmMoYHR1cmJvICR7dGFza05hbWV9IC0tZHJ5PWpzb25gKVxuICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKGdyYXBoLnRvU3RyaW5nKCkpLnRhc2tzXG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdClcbn0iXSwibmFtZXMiOlsiZXhlY1N5bmMiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwidGFza05hbWUiLCJib2R5IiwiZ3JhcGgiLCJyZXN1bHQiLCJKU09OIiwicGFyc2UiLCJ0b1N0cmluZyIsInRhc2tzIiwic3RhdHVzIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/build-graph.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/build-graph.ts"));
module.exports = __webpack_exports__;

})();