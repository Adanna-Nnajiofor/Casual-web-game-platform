"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = __importDefault(require("../config/db"));
const user_model_1 = __importDefault(require("../models/user.model"));
const fixIndex = async () => {
    try {
        await (0, db_1.default)();
        console.log(" Connected to MongoDB");
        const indexes = await user_model_1.default.collection.indexes();
        const hasFirebaseUidIndex = indexes.some((index) => index.name === "firebaseUid_1");
        if (hasFirebaseUidIndex) {
            await user_model_1.default.collection.dropIndex("firebaseUid_1");
            console.log(" Dropped old index 'firebaseUid_1'");
        }
        else {
            console.log(" Index 'firebaseUid_1' does not exist. Skipping drop.");
        }
        await user_model_1.default.collection.createIndex({ firebaseUid: 1 }, { unique: true, sparse: true });
        console.log(" Created new sparse unique index on 'firebaseUid'");
        process.exit(0);
    }
    catch (error) {
        console.error(" Error fixing index:", error.message);
        process.exit(1);
    }
};
fixIndex();
