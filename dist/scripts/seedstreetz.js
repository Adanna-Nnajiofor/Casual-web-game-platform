"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// seed/seedStreetz.ts
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../src/config/db")); // Adjust path as needed
const Streetz_1 = __importDefault(require("../src/models/Streetz"));
const seedStreetz = async () => {
    try {
        await (0, db_1.default)();
        await Streetz_1.default.deleteMany({}); // Clear old data
        const words = [ /* paste full array here, see earlier message */];
        await Streetz_1.default.insertMany(words);
        console.log('🎉 Streetz game data inserted!');
        mongoose_1.default.connection.close();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};
seedStreetz();
