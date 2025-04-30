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
exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const score_service_1 = require("../services/score.service");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize a default score (0, or any other default value)
    const initialScore = 0;
    // Create a new user
    const user = new user_model_1.default(Object.assign(Object.assign({}, data), { stats: {
            totalScore: initialScore,
            totalGamesPlayed: 0,
            achievements: [],
        }, friends: [] }));
    try {
        // Save the user in the database
        const savedUser = yield user.save();
        // Optionally validate the score after creating the user
        yield (0, score_service_1.validateAndUpdateScore)(savedUser._id.toString(), initialScore);
        return savedUser;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed.");
    }
});
exports.createUser = createUser;
