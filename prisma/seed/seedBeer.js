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
var prisma_extension_random_1 = require("prisma-extension-random");
var lorem_ipsum_1 = require("lorem-ipsum");
var images_1 = require("./images");
var github_slugger_1 = require("github-slugger");
var slugger = new github_slugger_1.default();
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var breweries, breweryLength, countBreweries, countBeers, users, styles, _i, breweries_1, brewery, i, b, user, style, precisionABV, min, max, x, name_1, description, abv, ibu, yearCreated, available, headline, styleId, userId, images, j, imageUrl, slug, slugExists, checkSlug, beer, _a, images_2, image, reviewCount, userReview, r, rating, review;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prisma.brewery.findMany({
                        include: { beers: true }
                    })];
                case 1:
                    breweries = _b.sent();
                    breweryLength = breweries.length;
                    countBreweries = 1;
                    countBeers = 0;
                    return [4 /*yield*/, prisma.user.findMany({
                            select: { id: true }
                        })];
                case 2:
                    users = _b.sent();
                    return [4 /*yield*/, prisma.style.findMany()];
                case 3:
                    styles = _b.sent();
                    _i = 0, breweries_1 = breweries;
                    _b.label = 4;
                case 4:
                    if (!(_i < breweries_1.length)) return [3 /*break*/, 22];
                    brewery = breweries_1[_i];
                    if (!(brewery.beers.length === 0)) return [3 /*break*/, 20];
                    i = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
                    countBeers = 0;
                    b = 0;
                    _b.label = 5;
                case 5:
                    if (!(b < i)) return [3 /*break*/, 20];
                    user = users[Math.floor(Math.random() * users.length)];
                    style = styles[Math.floor(Math.random() * styles.length)];
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
                    styleId = (style === null || style === void 0 ? void 0 : style.id) || "5ca0856e-307f-4313-a8c5-c52ff6b47530";
                    userId = (user === null || user === void 0 ? void 0 : user.id) || "cm1q68hds0000146zv7kkvnnu";
                    images = [];
                    for (j = 0; j < x; j++) {
                        imageUrl = images_1.newImages[j].imageUrl;
                        images.push({ image: imageUrl, order: j });
                    }
                    slug = slugger.slug(name_1);
                    slugExists = true;
                    _b.label = 6;
                case 6:
                    if (!slugExists) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.beer.findUnique({
                            where: { slug: slug }
                        })];
                case 7:
                    checkSlug = _b.sent();
                    if (!checkSlug) {
                        slugExists = false;
                        return [3 /*break*/, 8];
                    }
                    else {
                        slug = slugger.slug(name_1);
                    }
                    return [3 /*break*/, 6];
                case 8: return [4 /*yield*/, prisma.beer.create({
                        data: {
                            name: name_1,
                            description: description,
                            slug: slug,
                            abv: abv,
                            ibu: ibu,
                            yearCreated: yearCreated,
                            available: available,
                            headline: headline,
                            styleId: styleId,
                            userId: userId,
                            status: "APPROVED",
                            breweryId: brewery.id
                        }
                    })];
                case 9:
                    beer = _b.sent();
                    _a = 0, images_2 = images;
                    _b.label = 10;
                case 10:
                    if (!(_a < images_2.length)) return [3 /*break*/, 13];
                    image = images_2[_a];
                    return [4 /*yield*/, prisma.beerImages.create({
                            data: {
                                order: image.order,
                                image: image.image,
                                beerId: beer.id
                            }
                        })];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12:
                    _a++;
                    return [3 /*break*/, 10];
                case 13:
                    reviewCount = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
                    return [4 /*yield*/, prisma.user.findManyRandom(reviewCount, {
                            select: { id: true }
                        })];
                case 14:
                    userReview = _b.sent();
                    r = 0;
                    _b.label = 15;
                case 15:
                    if (!(r < reviewCount)) return [3 /*break*/, 18];
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
                case 16:
                    review = _b.sent();
                    console.log(review.rating);
                    _b.label = 17;
                case 17:
                    r++;
                    return [3 /*break*/, 15];
                case 18:
                    countBeers++;
                    console.log("Brewery - ".concat(countBreweries, " / ").concat(breweryLength, " - Beer ").concat(countBeers, " / ").concat(i));
                    _b.label = 19;
                case 19:
                    b++;
                    return [3 /*break*/, 5];
                case 20:
                    countBreweries++;
                    _b.label = 21;
                case 21:
                    _i++;
                    return [3 /*break*/, 4];
                case 22: return [2 /*return*/];
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
