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
var lorem_ipsum_1 = require("lorem-ipsum");
var prisma = new client_1.PrismaClient();
var lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
var ratings = [1, 2, 3, 4, 5];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, review, i, review, i, review;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 500)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.breweryReview.create({
                            data: {
                                comment: lorem.generateParagraphs(1),
                                rating: 5,
                                status: "APPROVED",
                                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                                userId: "cm1q68hds0000146zv7kkvnnu"
                            }
                        })];
                case 2:
                    review = _a.sent();
                    console.log(i, review.rating);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < 450)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.breweryReview.create({
                            data: {
                                comment: lorem.generateParagraphs(1),
                                rating: 4,
                                status: "APPROVED",
                                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                                userId: "cm1q68hds0000146zv7kkvnnu"
                            }
                        })];
                case 6:
                    review = _a.sent();
                    console.log(i, review.rating);
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < 200)) return [3 /*break*/, 12];
                    return [4 /*yield*/, prisma.breweryReview.create({
                            data: {
                                comment: lorem.generateParagraphs(1),
                                rating: 3,
                                status: "APPROVED",
                                breweryId: "f6599024-3838-40e6-97d6-d57845ee9a11",
                                userId: "cm1q68hds0000146zv7kkvnnu"
                            }
                        })];
                case 10:
                    review = _a.sent();
                    console.log(i, review.rating);
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 9];
                case 12: return [2 /*return*/];
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
