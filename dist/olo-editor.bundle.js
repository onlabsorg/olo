(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["olo-editor"],{

/***/ "./lib/olo-webui/olo-editor.html":
/*!***************************************!*\
  !*** ./lib/olo-webui/olo-editor.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<ace-editor class=\\\"olo-editor\\\"\\n            v-model=\\\"content\\\"\\n            @init=\\\"initEditor\\\"\\n            :lang=\\\"lang\\\"\\n            theme=\\\"chrome\\\"\\n            :options=\\\"editorOptions\\\">\\n        </ace-editor>\\n\";\n\n//# sourceURL=webpack:///./lib/olo-webui/olo-editor.html?");

/***/ }),

/***/ "./lib/olo-webui/olo-editor.js":
/*!*************************************!*\
  !*** ./lib/olo-webui/olo-editor.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\nmodule.exports = {\n\n    template: __webpack_require__(/*! ./olo-editor.html */ \"./lib/olo-webui/olo-editor.html\"),\n\n    components: {\n        'ace-editor': __webpack_require__(/*! vue2-ace-editor */ \"./node_modules/vue2-ace-editor/index.js\"),\n    },\n    \n    props: ['value', 'lang'],\n\n    data: () => Object({\n        editorOptions: {\n            fontSize: \"12pt\",\n            //showLineNumbers: false,\n            //showGutter: false\n        }\n    }),\n    \n    computed: {\n        content: {\n            get () {\n                return this.value;\n            },\n            set (value) {\n                this.$emit('input', value);\n            }\n        }\n    },\n    \n    methods: {\n        \n        initEditor () {\n            __webpack_require__(/*! brace/ext/language_tools */ \"./node_modules/brace/ext/language_tools.js\"); //language extension prerequsite...\n            __webpack_require__(/*! brace/mode/yaml */ \"./node_modules/brace/mode/yaml.js\");\n            __webpack_require__(/*! brace/theme/chrome */ \"./node_modules/brace/theme/chrome.js\")\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./lib/olo-webui/olo-editor.js?");

/***/ })

}]);