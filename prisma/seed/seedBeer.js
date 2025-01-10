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
var faker_1 = require("@faker-js/faker");
var supabase_1 = require("../../utils/supabase");
var prisma_extension_random_1 = require("prisma-extension-random");
var lorem_ipsum_1 = require("lorem-ipsum");
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
var prisma = new client_1.PrismaClient().$extends((0, prisma_extension_random_1.default)());
var getUrlExtension = function (url) {
    var _a;
    return (_a = url.split(/[#?]/)[0].split(".").pop()) === null || _a === void 0 ? void 0 : _a.trim();
};
var onImageEdit = function (imgUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var imgExt, response, blob, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imgExt = getUrlExtension(imgUrl);
                return [4 /*yield*/, fetch(imgUrl)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.blob()];
            case 2:
                blob = _a.sent();
                file = new File([blob], "profileImage." + imgExt, {
                    type: blob.type
                });
                return [2 /*return*/, file];
        }
    });
}); };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var breweries, _i, breweries_1, brewery, i, b, user, subStyle, precisionABV, min, max, x, name_1, description, abv, ibu, yearCreated, available, headline, subStyleId, userId, images, j, image, imageUrl, beer, _a, images_1, image, reviewCount, userReview, r, rating, review;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prisma.brewery.findMany({
                        include: { beers: true }
                    })];
                case 1:
                    breweries = _b.sent();
                    _i = 0, breweries_1 = breweries;
                    _b.label = 2;
                case 2:
                    if (!(_i < breweries_1.length)) return [3 /*break*/, 23];
                    brewery = breweries_1[_i];
                    if (!(brewery.beers.length === 0)) return [3 /*break*/, 22];
                    i = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
                    b = 0;
                    _b.label = 3;
                case 3:
                    if (!(b < 3)) return [3 /*break*/, 22];
                    return [4 /*yield*/, prisma.user.findRandom({
                            select: { id: true }
                        })];
                case 4:
                    user = _b.sent();
                    return [4 /*yield*/, prisma.subStyle.findRandom()];
                case 5:
                    subStyle = _b.sent();
                    precisionABV = 10;
                    min = 10;
                    max = 100;
                    x = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
                    name_1 = faker_1.faker.lorem.words({ min: 1, max: 3 });
                    description = faker_1.faker.lorem.paragraphs({ min: 2, max: 5 });
                    abv = (Math.floor(Math.random() * (10 * precisionABV - 1 * precisionABV) +
                        1 * precisionABV) /
                        (1 * precisionABV)).toString();
                    ibu = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
                    yearCreated = Math.floor(Math.random() * (2025 - 1980) + 1980);
                    available = faker_1.faker.datatype.boolean();
                    headline = faker_1.faker.lorem.sentence({ min: 5, max: 10 });
                    subStyleId = (subStyle === null || subStyle === void 0 ? void 0 : subStyle.id) || "045e8676-a426-4b64-bb4e-5cc669e0e3c1";
                    userId = (user === null || user === void 0 ? void 0 : user.id) || "cm1q68hds0000146zv7kkvnnu";
                    images = [];
                    j = 0;
                    _b.label = 6;
                case 6:
                    if (!(j < 2)) return [3 /*break*/, 10];
                    return [4 /*yield*/, onImageEdit(faker_1.faker.image.urlPicsumPhotos())];
                case 7:
                    image = _b.sent();
                    return [4 /*yield*/, (0, supabase_1.uploadImage)(image, "images-bucket")];
                case 8:
                    imageUrl = _b.sent();
                    images.push({ image: imageUrl, order: j });
                    _b.label = 9;
                case 9:
                    j++;
                    return [3 /*break*/, 6];
                case 10: return [4 /*yield*/, prisma.beer.create({
                        data: {
                            name: name_1,
                            description: description,
                            abv: abv,
                            ibu: ibu,
                            yearCreated: yearCreated,
                            available: available,
                            headline: headline,
                            subStyleId: subStyleId,
                            userId: userId,
                            status: "APPROVED",
                            breweryId: brewery.id
                        }
                    })];
                case 11:
                    beer = _b.sent();
                    _a = 0, images_1 = images;
                    _b.label = 12;
                case 12:
                    if (!(_a < images_1.length)) return [3 /*break*/, 15];
                    image = images_1[_a];
                    return [4 /*yield*/, prisma.beerImages.create({
                            data: {
                                order: image.order,
                                image: image.image,
                                beerId: beer.id
                            }
                        })];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14:
                    _a++;
                    return [3 /*break*/, 12];
                case 15:
                    reviewCount = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
                    return [4 /*yield*/, prisma.user.findManyRandom(reviewCount, {
                            select: { id: true }
                        })];
                case 16:
                    userReview = _b.sent();
                    r = 0;
                    _b.label = 17;
                case 17:
                    if (!(r < reviewCount)) return [3 /*break*/, 20];
                    rating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
                    return [4 /*yield*/, prisma.beerReview.create({
                            data: {
                                comment: lorem.generateParagraphs(1),
                                rating: rating,
                                status: "APPROVED",
                                beerId: beer.id,
                                userId: userReview[r].id
                            }
                        })];
                case 18:
                    review = _b.sent();
                    console.log(r, review.rating);
                    _b.label = 19;
                case 19:
                    r++;
                    return [3 /*break*/, 17];
                case 20:
                    console.log(name_1);
                    _b.label = 21;
                case 21:
                    b++;
                    return [3 /*break*/, 3];
                case 22:
                    _i++;
                    return [3 /*break*/, 2];
                case 23: return [2 /*return*/];
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
