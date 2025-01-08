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
        var i, country, breweryType, user, x, name_1, address1, city, region, postalCode, countryId, formattedAddress, description, website, logo, logoUrl, headline, breweryTypeId, images, j, image, imageUrl, brewery, _i, images_1, image;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 200)) return [3 /*break*/, 18];
                    return [4 /*yield*/, prisma.country.findRandom({
                            select: { id: true, name: true }
                        })];
                case 2:
                    country = _a.sent();
                    return [4 /*yield*/, prisma.breweryType.findRandom({
                            where: {
                                id: {
                                    in: [
                                        "Australia",
                                        "United Kingdom",
                                        "United States",
                                        "New Zealand",
                                        "Canada"
                                    ]
                                }
                            },
                            select: { id: true, name: true }
                        })];
                case 3:
                    breweryType = _a.sent();
                    return [4 /*yield*/, prisma.user.findRandom({
                            select: { id: true }
                        })];
                case 4:
                    user = _a.sent();
                    x = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
                    name_1 = faker_1.faker.company.name();
                    address1 = faker_1.faker.location.streetAddress();
                    city = faker_1.faker.location.city();
                    region = faker_1.faker.location.state();
                    postalCode = faker_1.faker.location.zipCode();
                    countryId = (country === null || country === void 0 ? void 0 : country.id) || "cm1pt6p0x036pajanvfyay0jf";
                    formattedAddress = "".concat(address1, ", ").concat(city, ", ").concat(region, ", ").concat(country === null || country === void 0 ? void 0 : country.name, ", ").concat(postalCode);
                    description = faker_1.faker.lorem.paragraphs({ min: 2, max: 5 });
                    website = faker_1.faker.internet.url();
                    return [4 /*yield*/, onImageEdit(faker_1.faker.image.avatar())];
                case 5:
                    logo = _a.sent();
                    return [4 /*yield*/, (0, supabase_1.uploadImage)(logo, "logos-bucket")];
                case 6:
                    logoUrl = _a.sent();
                    headline = faker_1.faker.lorem.sentence({ min: 5, max: 10 });
                    breweryTypeId = (breweryType === null || breweryType === void 0 ? void 0 : breweryType.id) || "5de06308-8023-4b2a-85bb-6427adede27c";
                    images = [];
                    j = 0;
                    _a.label = 7;
                case 7:
                    if (!(j < x)) return [3 /*break*/, 11];
                    return [4 /*yield*/, onImageEdit(faker_1.faker.image.urlPicsumPhotos())];
                case 8:
                    image = _a.sent();
                    return [4 /*yield*/, (0, supabase_1.uploadImage)(image, "images-bucket")];
                case 9:
                    imageUrl = _a.sent();
                    images.push({ image: imageUrl, order: j });
                    _a.label = 10;
                case 10:
                    j++;
                    return [3 /*break*/, 7];
                case 11: return [4 /*yield*/, prisma.brewery.create({
                        data: {
                            name: name_1,
                            address1: address1,
                            city: city,
                            region: region,
                            postalCode: postalCode,
                            countryId: countryId,
                            formattedAddress: formattedAddress,
                            description: description,
                            website: website,
                            logoUrl: logoUrl,
                            headline: headline,
                            breweryTypeId: breweryTypeId,
                            userId: (user === null || user === void 0 ? void 0 : user.id) || "cm1q68hds0000146zv7kkvnnu"
                        }
                    })];
                case 12:
                    brewery = _a.sent();
                    _i = 0, images_1 = images;
                    _a.label = 13;
                case 13:
                    if (!(_i < images_1.length)) return [3 /*break*/, 16];
                    image = images_1[_i];
                    return [4 /*yield*/, prisma.breweryImages.create({
                            data: {
                                order: image.order,
                                image: image.image,
                                breweryId: brewery.id
                            }
                        })];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    _i++;
                    return [3 /*break*/, 13];
                case 16:
                    console.log(name_1);
                    _a.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 1];
                case 18: return [2 /*return*/];
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
