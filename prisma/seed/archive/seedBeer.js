"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g = Object.create(
                (typeof Iterator === "function" ? Iterator : Object).prototype
            );
        return (
            (g.next = verb(0)),
            (g["throw"] = verb(1)),
            (g["return"] = verb(2)),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                      ? y["throw"] ||
                                        ((t = y["return"]) && t.call(y), 0)
                                      : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var supabase_1 = require("../../../utils/supabase");
var prisma = new client_1.PrismaClient();
var getUrlExtension = function (url) {
    var _a;
    return (_a = url.split(/[#?]/)[0].split(".").pop()) === null ||
        _a === void 0
        ? void 0
        : _a.trim();
};
var onImageEdit = function (imgUrl) {
    return __awaiter(void 0, void 0, void 0, function () {
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
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var i, beer, beer1, beer2, beer1Url, beer2Url, beerImages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 11)) return [3 /*break*/, 9];
                    return [
                        4 /*yield*/,
                        prisma.beer.create({
                            data: {
                                name: "Mark's Beer",
                                status: "APPROVED",
                                description:
                                    "Trust fund deep v bicycle rights kombucha edison bulb shoreditch chillwave adaptogen jean shorts JOMO squid flannel freegan Brooklyn literally. Lomo subway tile coloring book woke vice franzen cliche post-ironic tattooed. Schlitz keytar vaporware artisan, four dollar toast cupping gentrify viral +1 celiac 90's marxism narwhal disrupt. Butcher godard knausgaard lo-fi meditation hella marxism swag craft beer fanny pack irony photo booth celiac cliche neutra. Flexitarian blog jawn skateboard squid man bun hell of lumbersexual health goth la croix bodega boys. Gochujang DSA bruh irony fanny pack post-ironic portland typewriter hell of. Cray viral lomo cold-pressed sriracha tilde.",
                                abv: "6",
                                ibu: "37",
                                yearCreated: 2017,
                                available: true,
                                headline: "This is a great beer",
                                breweryId:
                                    "f6599024-3838-40e6-97d6-d57845ee9a11",
                                subStyleId:
                                    "b93f5cd4-6e83-4cd7-9428-a2c5ba0c47bf",
                                userId: "cm1q68hds0000146zv7kkvnnu"
                            }
                        })
                    ];
                case 2:
                    beer = _a.sent();
                    return [
                        4 /*yield*/,
                        onImageEdit(
                            "https://ijtvuxdbxfqssvyrwmla.supabase.co/storage/v1/object/public/images-bucket/1729696324903-tinywow_9d9087_d1e2f39bddb243bf86789497ce91046fmv2_67552468.png"
                        )
                    ];
                case 3:
                    beer1 = _a.sent();
                    return [
                        4 /*yield*/,
                        onImageEdit(
                            "https://ijtvuxdbxfqssvyrwmla.supabase.co/storage/v1/object/public/images-bucket/1729696326047-tinywow_9d9087_2aec6926612a487e887c6be409f6c9d0mv2_67552468.png"
                        )
                    ];
                case 4:
                    beer2 = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, supabase_1.uploadImage)(beer1, "images-bucket")
                    ];
                case 5:
                    beer1Url = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, supabase_1.uploadImage)(beer2, "images-bucket")
                    ];
                case 6:
                    beer2Url = _a.sent();
                    return [
                        4 /*yield*/,
                        prisma.beerImages.createMany({
                            data: [
                                {
                                    image: beer1Url,
                                    order: 1,
                                    beerId: beer.id
                                },
                                {
                                    image: beer2Url,
                                    order: 2,
                                    beerId: beer.id
                                }
                            ]
                        })
                    ];
                case 7:
                    beerImages = _a.sent();
                    console.log(i, beer, beerImages);
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9:
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, prisma.$disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    })
    .catch(function (e) {
        return __awaiter(void 0, void 0, void 0, function () {
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
        });
    });
