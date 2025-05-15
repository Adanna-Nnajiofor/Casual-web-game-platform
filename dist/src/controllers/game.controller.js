"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGamesByType = exports.getGameBySlug = exports.getAllGames = void 0;
const game_service_1 = require("../services/game.service");
const firebase_admin_1 = require("../config/firebase-admin");
const getAllGames = async (req, res) => {
    try {
        const games = await (0, game_service_1.fetchAllGames)();
        res.status(200).json(games);
    }
    catch (error) {
        console.error("Error fetching all games:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllGames = getAllGames;
const getGameBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const game = await (0, game_service_1.fetchGameBySlug)(slug);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        // If it's a trivia game, fetch questions from Firebase
        if (game.type === "trivia") {
            const questionsSnapshot = await firebase_admin_1.db.collection("questions").get();
            const questions = questionsSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            // Return game info with questions
            res.status(200).json(Object.assign(Object.assign({}, game.toObject()), { questions }));
            return;
        }
        // If it's a streetz game, fetch slangs from Firebase
        if (game.type === "streetz") {
            const slangsSnapshot = await firebase_admin_1.db.collection("slangs").get();
            const slangs = slangsSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            // Return game info with slangs
            res.status(200).json(Object.assign(Object.assign({}, game.toObject()), { slangs }));
            return;
        }
        res.status(200).json(game);
    }
    catch (error) {
        console.error("Error fetching game by slug:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getGameBySlug = getGameBySlug;
const getGamesByType = async (req, res) => {
    const { type } = req.params;
    if (!type) {
        res.status(400).json({ message: "Missing game type" });
        return;
    }
    try {
        const games = await (0, game_service_1.fetchGamesByType)(type);
        if (!games || games.length === 0) {
            res.status(404).json({ message: `No games found of type: ${type}` });
            return;
        }
        // For trivia type, include questions
        if (type === "trivia") {
            const questionsSnapshot = await firebase_admin_1.db.collection("questions").get();
            const questions = questionsSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            res.status(200).json({
                games,
                questions,
            });
            return;
        }
        // For streetz type, include slangs
        if (type === "streetz") {
            const slangsSnapshot = await firebase_admin_1.db.collection("slangs").get();
            const slangs = slangsSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            res.status(200).json({
                games,
                slangs,
            });
            return;
        }
        res.status(200).json(games);
    }
    catch (error) {
        console.error("Error fetching games by type:", error);
        res.status(500).json({ message: "Failed to fetch games by type", error });
    }
};
exports.getGamesByType = getGamesByType;
