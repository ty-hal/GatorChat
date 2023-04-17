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
var styled_components_1 = __importDefault(require("styled-components"));
var SearchIcon_1 = require("./SearchIcon");
function Results(_a) {
    var _b = _a.results, results = _b === void 0 ? [] : _b, onClick = _a.onClick, setSearchString = _a.setSearchString, showIcon = _a.showIcon, maxResults = _a.maxResults, _c = _a.resultStringKeyName, resultStringKeyName = _c === void 0 ? 'name' : _c, highlightedItem = _a.highlightedItem, setHighlightedItem = _a.setHighlightedItem, formatResult = _a.formatResult, _d = _a.showNoResultsFlag, showNoResultsFlag = _d === void 0 ? true : _d, _e = _a.showNoResultsText, showNoResultsText = _e === void 0 ? 'No results' : _e;
    var formatResultWithKey = formatResult
        ? formatResult
        : function (item) { return item[resultStringKeyName]; };
    var handleClick = function (result) {
        onClick(result);
        setSearchString(result[resultStringKeyName]);
    };
    var handleMouseDown = function (_a) {
        var event = _a.event, result = _a.result;
        if (event.button === 0) {
            event.preventDefault();
            handleClick(result);
        }
    };
    if (showNoResultsFlag) {
        return ((0, jsx_runtime_1.jsx)(ResultsWrapper, { children: (0, jsx_runtime_1.jsxs)("li", __assign({ "data-test": "no-results-message" }, { children: [(0, jsx_runtime_1.jsx)(SearchIcon_1.SearchIcon, { showIcon: showIcon }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "ellipsis" }, { children: showNoResultsText }))] })) }));
    }
    if ((results === null || results === void 0 ? void 0 : results.length) <= 0 && !showNoResultsFlag) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(ResultsWrapper, { children: results.slice(0, maxResults).map(function (result, index) { return ((0, jsx_runtime_1.jsxs)("li", __assign({ className: highlightedItem === index ? 'selected' : '', onMouseEnter: function () { return setHighlightedItem({ index: index }); }, "data-test": "result", onMouseDown: function (event) { return handleMouseDown({ event: event, result: result }); }, onClick: function () { return handleClick(result); } }, { children: [(0, jsx_runtime_1.jsx)(SearchIcon_1.SearchIcon, { showIcon: showIcon }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "ellipsis", title: result[resultStringKeyName] }, { children: formatResultWithKey(result) }))] }), "rsa-result-".concat(result.id))); }) }));
}
exports.default = Results;
var ResultsWrapper = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(StyledResults, { children: [(0, jsx_runtime_1.jsx)("div", { className: "line" }), (0, jsx_runtime_1.jsx)("ul", { children: children })] }));
};
var StyledResults = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  > div.line {\n    border-top-color: ", ";\n    border-top-style: solid;\n    border-top-width: 1px;\n\n    margin-bottom: 0px;\n    margin-left: 14px;\n    margin-right: 20px;\n    margin-top: 0px;\n\n    padding-bottom: 4px;\n  }\n\n  > ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0px 0 16px 0;\n    max-height: ", ";\n\n    > li {\n      display: flex;\n      align-items: center;\n      padding: 4px 0 4px 0;\n\n      > div {\n        margin-left: 13px;\n      }\n    }\n  }\n\n  .ellipsis {\n    text-align: left;\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .selected {\n    background-color: ", ";\n  }\n"], ["\n  > div.line {\n    border-top-color: ", ";\n    border-top-style: solid;\n    border-top-width: 1px;\n\n    margin-bottom: 0px;\n    margin-left: 14px;\n    margin-right: 20px;\n    margin-top: 0px;\n\n    padding-bottom: 4px;\n  }\n\n  > ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0px 0 16px 0;\n    max-height: ", ";\n\n    > li {\n      display: flex;\n      align-items: center;\n      padding: 4px 0 4px 0;\n\n      > div {\n        margin-left: 13px;\n      }\n    }\n  }\n\n  .ellipsis {\n    text-align: left;\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .selected {\n    background-color: ", ";\n  }\n"])), function (props) { return props.theme.lineColor; }, function (props) { return props.theme.maxHeight; }, function (props) { return props.theme.hoverBackgroundColor; });
var templateObject_1;
