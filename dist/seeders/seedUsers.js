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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const users = [
    {
        username: "gamerqueen",
        email: "gamerqueen@example.com",
        password: "password123",
        avatar: "https://example.com/avatar1.png",
        stats: {
            totalGamesPlayed: 25,
            totalScore: 9800,
            achievements: ["First Win", "Top Scorer"],
        },
    },
    {
        username: "proplayer",
        email: "proplayer@example.com",
        password: "password456",
        avatar: "https://example.com/avatar2.png",
        stats: {
            totalGamesPlayed: 40,
            totalScore: 15800,
            achievements: ["Champion", "Speed Runner"],
        },
    },
    {
        username: "casualchamp",
        email: "casualchamp@example.com",
        password: "password789",
        avatar: "https://example.com/avatar3.png",
        stats: {
            totalGamesPlayed: 10,
            totalScore: 4200,
            achievements: ["Rookie"],
        },
    },
];
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)();
            // Hash passwords
            const hashedUsers = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, user), { password: yield bcryptjs_1.default.hash(user.password, 10) }));
            })));
            yield user_model_1.default.deleteMany({});
            yield user_model_1.default.insertMany(hashedUsers);
            console.log(" User data seeded successfully");
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }
        catch (error) {
            console.error(" Error seeding users:", error);
            yield mongoose_1.default.disconnect();
            process.exit(1);
        }
    });
}
seedUsers();
