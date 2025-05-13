"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionsByUser = exports.saveSession = void 0;
const session_service_1 = require("../services/session.service");
const saveSession = async (req, res, next) => {
    try {
        const session = await (0, session_service_1.createAndSaveSession)(req);
        res.status(201).json({ message: "Session saved", session });
    }
    catch (error) {
        next(error);
    }
};
exports.saveSession = saveSession;
const getSessionsByUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const sessions = await (0, session_service_1.fetchSessionsByUser)(userId);
        res.status(200).json({ sessions });
    }
    catch (error) {
        next(error);
    }
};
exports.getSessionsByUser = getSessionsByUser;
