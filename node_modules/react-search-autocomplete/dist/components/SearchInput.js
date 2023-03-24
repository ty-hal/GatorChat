"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = __importDefault(require("styled-components"));
var ClearIcon_1 = require("./ClearIcon");
var SearchIcon_1 = require("./SearchIcon");
function SearchInput(_a) {
    var searchString = _a.searchString, setSearchString = _a.setSearchString, setHighlightedItem = _a.setHighlightedItem, eraseResults = _a.eraseResults, autoFocus = _a.autoFocus, onFocus = _a.onFocus, onClear = _a.onClear, placeholder = _a.placeholder, _b = _a.showIcon, showIcon = _b === void 0 ? true : _b, _c = _a.showClear, showClear = _c === void 0 ? true : _c, maxLength = _a.maxLength;
    var ref = (0, react_1.useRef)(null);
    var manualFocus = true;
    var setFocus = function () {
        manualFocus = false;
        (ref === null || ref === void 0 ? void 0 : ref.current) && ref.current.focus();
        manualFocus = true;
    };
    var handleOnFocus = function (event) {
        manualFocus && onFocus(event);
    };
    var maxLengthProperty = maxLength ? { maxLength: maxLength } : {};
    return ((0, jsx_runtime_1.jsxs)(StyledSearchInput, { children: [(0, jsx_runtime_1.jsx)(SearchIcon_1.SearchIcon, { showIcon: showIcon }), (0, jsx_runtime_1.jsx)("input", __assign({ type: "text", ref: ref, spellCheck: false, value: searchString, onChange: setSearchString, onFocus: handleOnFocus, placeholder: placeholder, autoFocus: autoFocus, onBlur: function () { return eraseResults(); }, onKeyDown: function (event) { return setHighlightedItem({ event: event }); }, "data-test": "search-input" }, maxLengthProperty)), (0, jsx_runtime_1.jsx)(ClearIcon_1.ClearIcon, { showClear: showClear, setSearchString: setSearchString, searchString: searchString, onClear: onClear, setFocus: setFocus })] }));
}
exports.default = SearchInput;
var StyledSearchInput = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: ", ";\n  width: 100%;\n\n  display: flex;\n  align-items: center;\n\n  > input {\n    width: 100%;\n\n    padding: 0 0 0 13px;\n\n    border: none;\n    outline: none;\n\n    background-color: rgba(0, 0, 0, 0);\n    font-size: inherit;\n    font-family: inherit;\n\n    color: ", ";\n\n    ::placeholder {\n      color: ", ";\n      opacity: 1;\n\n      :-ms-input-placeholder {\n        color: ", ";\n      }\n\n      ::-ms-input-placeholder {\n        color: ", ";\n      }\n    }\n  }\n"], ["\n  min-height: ", ";\n  width: 100%;\n\n  display: flex;\n  align-items: center;\n\n  > input {\n    width: 100%;\n\n    padding: 0 0 0 13px;\n\n    border: none;\n    outline: none;\n\n    background-color: rgba(0, 0, 0, 0);\n    font-size: inherit;\n    font-family: inherit;\n\n    color: ", ";\n\n    ::placeholder {\n      color: ", ";\n      opacity: 1;\n\n      :-ms-input-placeholder {\n        color: ", ";\n      }\n\n      ::-ms-input-placeholder {\n        color: ", ";\n      }\n    }\n  }\n"])), function (props) { return props.theme.height; }, function (props) { return props.theme.color; }, function (props) { return props.theme.placeholderColor; }, function (props) { return props.theme.placeholderColor; }, function (props) { return props.theme.placeholderColor; });
var templateObject_1;
