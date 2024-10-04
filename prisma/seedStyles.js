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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var styles_1 = require("./styles");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, styles_2, parent_1, parentStyle, _a, _b, style, styleDb, _c, _d, subStyle, subStyleDb;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _i = 0, styles_2 = styles_1.styles;
                    _e.label = 1;
                case 1:
                    if (!(_i < styles_2.length)) return [3 /*break*/, 10];
                    parent_1 = styles_2[_i];
                    return [4 /*yield*/, prisma.parentStyle.create({
                            data: {
                                name: parent_1.name,
                                status: "APPROVED",
                                userId: "cm1q68hds0000146zv7kkvnnu"
                            }
                        })];
                case 2:
                    parentStyle = _e.sent();
                    console.log(parentStyle.id, parentStyle.name);
                    _a = 0, _b = parent_1.style;
                    _e.label = 3;
                case 3:
                    if (!(_a < _b.length)) return [3 /*break*/, 9];
                    style = _b[_a];
                    return [4 /*yield*/, prisma.style.create({
                            data: {
                                name: style.name,
                                status: "APPROVED",
                                userId: "cm1q68hds0000146zv7kkvnnu",
                                parentStyleId: parentStyle.id
                            }
                        })];
                case 4:
                    styleDb = _e.sent();
                    console.log(styleDb.id, styleDb.name);
                    _c = 0, _d = style.subStyle;
                    _e.label = 5;
                case 5:
                    if (!(_c < _d.length)) return [3 /*break*/, 8];
                    subStyle = _d[_c];
                    return [4 /*yield*/, prisma.subStyle.create({
                            data: {
                                name: subStyle.name,
                                status: "APPROVED",
                                userId: "cm1q68hds0000146zv7kkvnnu",
                                styleId: styleDb.id
                            }
                        })];
                case 6:
                    subStyleDb = _e.sent();
                    console.log(subStyleDb.id, subStyleDb.name);
                    _e.label = 7;
                case 7:
                    _c++;
                    return [3 /*break*/, 5];
                case 8:
                    _a++;
                    return [3 /*break*/, 3];
                case 9:
                    _i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
