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
exports.ClearIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importDefault(require("styled-components"));
var ClearIcon = function (_a) {
    var showClear = _a.showClear, setSearchString = _a.setSearchString, searchString = _a.searchString, setFocus = _a.setFocus, onClear = _a.onClear;
    var handleClearSearchString = function () {
        setSearchString({ target: { value: '' } });
        setFocus();
        onClear();
    };
    if (!showClear) {
        return null;
    }
    if (!searchString || (searchString === null || searchString === void 0 ? void 0 : searchString.length) <= 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(StyledClearIcon, __assign({ className: "clear-icon", onClick: handleClearSearchString }, { children: (0, jsx_runtime_1.jsx)("svg", __assign({ width: 20, height: 20, focusable: "false", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) })) })));
};
exports.ClearIcon = ClearIcon;
var StyledClearIcon = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: ", ";\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  > svg {\n    fill: ", ";\n  }\n"], ["\n  margin: ", ";\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  > svg {\n    fill: ", ";\n  }\n"])), function (props) { return props.theme.clearIconMargin; }, function (props) { return props.theme.iconColor; });
var templateObject_1;
