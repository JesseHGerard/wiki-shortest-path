"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var cheerio_1 = __importDefault(require("cheerio"));
var BASE_URL = "https://en.wikipedia.org";
var MAX_DEPTH = 5;
var args = process.argv.slice(2);
var rootURL = "/wiki/" + args[0];
var endURL = "/wiki/" + args[1];
var depth = 0;
var queue = [[rootURL]];
var solved = false;
var solution = [];
var numberOfRequests = 0;
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scrapeURLs(queue.shift())];
                case 1:
                    _a.sent();
                    if (!solved && depth < MAX_DEPTH) {
                        start();
                    }
                    else {
                        if (solved) {
                            console.log("SOLVED in " + (solution.length - 1) + " links: \n" + solution.reduce(function (accumulator, path) { return accumulator + " / " + path.slice(6); }, ""));
                        }
                        else {
                            console.log("Failed to solve in " + MAX_DEPTH + " links");
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
start();
function scrapeURLs(history) {
    return __awaiter(this, void 0, void 0, function () {
        var wikiURL, res, markup, $;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (depth > history.length) {
                        depth = history.length;
                    }
                    wikiURL = "" + BASE_URL + history[history.length - 1];
                    numberOfRequests++;
                    console.log(numberOfRequests, history.length, Math.round(queue.length / 100) / 10 + "k", history.reduce(function (accumulator, path) { return accumulator + " / " + path.slice(6); }, ""));
                    return [4 /*yield*/, node_fetch_1["default"](wikiURL)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.text()];
                case 2:
                    markup = _a.sent();
                    $ = cheerio_1["default"].load(markup);
                    queue.push.apply(queue, Object.values($("a")).reduce(function (accumulator, element) {
                        var _a;
                        var href = (_a = element.attribs) === null || _a === void 0 ? void 0 : _a.href;
                        return validateHref(href, history)
                            ? __spreadArrays(accumulator, [__spreadArrays(history, [href])]) : accumulator;
                    }, []));
                    return [2 /*return*/];
            }
        });
    });
}
function validateHref(href, history) {
    if (typeof href === "string" &&
        href.includes("/wiki/") &&
        !href.includes("File:") &&
        !href.includes("http") &&
        !history.includes(href)) {
        if (href === endURL) {
            solved = true;
            solution = __spreadArrays(history, [href]);
        }
        return true;
    }
    return false;
}
