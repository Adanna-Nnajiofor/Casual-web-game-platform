"use strict";
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
async function seedUsers() {
    try {
        await (0, db_1.default)();
        // Hash passwords
        const hashedUsers = await Promise.all(users.map(async (user) => (Object.assign(Object.assign({}, user), { password: await bcryptjs_1.default.hash(user.password, 10) }))));
        await user_model_1.default.deleteMany({});
        await user_model_1.default.insertMany(hashedUsers);
        console.log(" User data seeded successfully");
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error(" Error seeding users:", error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
seedUsers();
