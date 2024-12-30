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
var newStyles_1 = require("./newStyles");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var parentStyleName, parentStyleId, styleName, styleId, count, _i, newStyles_2, newStyle, parentStyle, newParentStyle, style, newBeerStyle, subStyleDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parentStyleName = "";
                    parentStyleId = "";
                    styleName = "";
                    styleId = "";
                    count = 0;
                    _i = 0, newStyles_2 = newStyles_1.newStyles;
                    _a.label = 1;
                case 1:
                    if (!(_i < newStyles_2.length)) return [3 /*break*/, 14];
                    newStyle = newStyles_2[_i];
                    console.log(count);
                    if (!(newStyle.parentStyle !== parentStyleName)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.parentStyle.findFirst({
                            where: { name: newStyle.parentStyle }
                        })];
                case 2:
                    parentStyle = _a.sent();
                    if (!parentStyle) return [3 /*break*/, 3];
                    parentStyleId = parentStyle === null || parentStyle === void 0 ? void 0 : parentStyle.id;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, prisma.parentStyle.create({
                        data: {
                            name: newStyle.parentStyle,
                            status: "APPROVED",
                            userId: "cm1q68hds0000146zv7kkvnnu"
                        }
                    })];
                case 4:
                    newParentStyle = _a.sent();
                    parentStyleId = newParentStyle.id;
                    _a.label = 5;
                case 5:
                    parentStyleName = newStyle.parentStyle;
                    _a.label = 6;
                case 6:
                    if (!(newStyle.style !== styleName)) return [3 /*break*/, 11];
                    return [4 /*yield*/, prisma.style.findFirst({
                            where: { name: newStyle.parentStyle }
                        })];
                case 7:
                    style = _a.sent();
                    if (!style) return [3 /*break*/, 8];
                    styleId = style === null || style === void 0 ? void 0 : style.id;
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, prisma.style.create({
                        data: {
                            name: newStyle.style,
                            status: "APPROVED",
                            userId: "cm1q68hds0000146zv7kkvnnu",
                            parentStyleId: parentStyleId
                        }
                    })];
                case 9:
                    newBeerStyle = _a.sent();
                    styleId = newBeerStyle.id;
                    _a.label = 10;
                case 10:
                    styleName = newStyle.style;
                    _a.label = 11;
                case 11: return [4 /*yield*/, prisma.subStyle.create({
                        data: {
                            name: newStyle.subStyle,
                            status: "APPROVED",
                            userId: "cm1q68hds0000146zv7kkvnnu",
                            styleId: styleId,
                            description: newStyle.description
                        }
                    })];
                case 12:
                    subStyleDb = _a.sent();
                    count++;
                    _a.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 1];
                case 14: return [2 /*return*/];
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
