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
exports.SearchIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importDefault(require("styled-components"));
var SearchIcon = function (_a) {
    var showIcon = _a.showIcon;
    if (!showIcon) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(StyledSearchIcon, __assign({ className: "search-icon", width: 20, height: 20, focusable: "false", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }) })));
};
exports.SearchIcon = SearchIcon;
var StyledSearchIcon = styled_components_1.default.svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-shrink: 0;\n  margin: ", ";\n  fill: ", ";\n"], ["\n  flex-shrink: 0;\n  margin: ", ";\n  fill: ", ";\n"])), function (props) { return props.theme.searchIconMargin; }, function (props) { return props.theme.iconColor; });
var templateObject_1;
