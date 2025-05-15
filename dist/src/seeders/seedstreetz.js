"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../config/db")); // Adjust path as needed
const Streetz_1 = __importDefault(require("../models/Streetz"));
const seedStreetz = async () => {
    try {
        await (0, db_1.default)();
        // Clear old data
        await Streetz_1.default.deleteMany({});
        const words = [
            { word: "Beta", meaning: "Better or improved", difficulty: "easy" },
            { word: "Comot", meaning: "To leave or get out", difficulty: "easy" },
            { word: "Gobe", meaning: "Big trouble or serious issue", difficulty: "easy" },
            { word: "Runs", meaning: "Hustle or shady deal", difficulty: "easy" },
            { word: "Sharp", meaning: "Smart or quick-witted", difficulty: "easy" },
            { word: "Abeg", meaning: "Please or kindly", difficulty: "easy" },
            { word: "Sha", meaning: "Used for emphasis or dismissal", difficulty: "easy" },
            { word: "Hustle", meaning: "Daily grind or work", difficulty: "easy" },
            { word: "Flex", meaning: "To enjoy or show off", difficulty: "easy" },
            { word: "Vex", meaning: "To be angry or upset", difficulty: "easy" },
            { word: "Wire", meaning: "To send money electronically", difficulty: "medium" },
            { word: "Zone", meaning: "To friendzone or isolate emotionally", difficulty: "medium" },
            { word: "Parole", meaning: "A plan or secret move", difficulty: "medium" },
            { word: "No wahala", meaning: "No problem or it’s okay", difficulty: "medium" },
            { word: "Level", meaning: "Situation or status", difficulty: "medium" },
            { word: "Cruise", meaning: "To joke or mess around", difficulty: "medium" },
            { word: "Pepper dem", meaning: "To show off and make others jealous", difficulty: "medium" },
            { word: "Over sabi", meaning: "Someone who acts like they know too much", difficulty: "medium" },
            { word: "Blow", meaning: "To become successful or famous", difficulty: "medium" },
            { word: "Package", meaning: "To present oneself in a way that looks better than reality", difficulty: "medium" },
            { word: "Press am", meaning: "Push it or go harder", difficulty: "hard" },
            { word: "Skoin skoin", meaning: "Acting crazy or irrational", difficulty: "hard" },
            { word: "On a low", meaning: "To do something quietly or secretly", difficulty: "hard" },
            { word: "Scatter ground", meaning: "Cause a scene or make a big impression", difficulty: "hard" },
            { word: "Pickin", meaning: "A child (Pikin)", difficulty: "hard" },
            { word: "E don cast", meaning: "It’s been exposed or the secret is out", difficulty: "hard" },
            { word: "Gbam", meaning: "Exactly or confirmed!", difficulty: "hard" },
            { word: "Carry last", meaning: "To come last or be left out", difficulty: "hard" },
            { word: "Scatter body", meaning: "To dance or go wild", difficulty: "hard" },
            { word: "Swallow", meaning: "Any starchy Nigerian food like eba, amala", difficulty: "hard" },
            { word: "Japa", meaning: "To flee or escape quickly", difficulty: "easy" },
            { word: "Sapa", meaning: "A state of being broke or financially down", difficulty: "easy" },
            { word: "Omo", meaning: "Expression of surprise or emphasis", difficulty: "easy" },
            { word: "Chop", meaning: "To eat or enjoy (money, food, etc.)", difficulty: "easy" },
            { word: "Wahala", meaning: "Trouble or problem", difficulty: "easy" },
            { word: "Ginger", meaning: "To motivate or hype someone", difficulty: "medium" },
            { word: "Yarn", meaning: "To talk or speak", difficulty: "medium" },
            { word: "Trek", meaning: "To walk a long distance", difficulty: "medium" },
            { word: "K-leg", meaning: "Something that’s not right or is off-track", difficulty: "medium" },
            { word: "Mugu", meaning: "A fool or someone easily deceived", difficulty: "medium" },
            { word: "E choke", meaning: "Something impressive or overwhelming", difficulty: "hard" },
            { word: "Shege", meaning: "Suffering or hardship", difficulty: "hard" },
            { word: "Gbese", meaning: "Being in debt", difficulty: "hard" },
            { word: "Jonz", meaning: "Being confused or clueless", difficulty: "hard" },
            { word: "Atarodo", meaning: "Used to describe a feisty person", difficulty: "hard" }
        ];
        await Streetz_1.default.insertMany(words);
        console.log('Streetz game data inserted 🎉');
        mongoose_1.default.connection.close();
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};
seedStreetz();
