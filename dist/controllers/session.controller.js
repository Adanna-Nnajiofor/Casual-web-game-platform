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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionsByUser = exports.saveSession = void 0;
const session_service_1 = require("../services/session.service");
const saveSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield (0, session_service_1.createAndSaveSession)(req);
        res.status(201).json({ message: "Session saved", session });
    }
    catch (error) {
        next(error);
    }
});
exports.saveSession = saveSession;
const getSessionsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const sessions = yield (0, session_service_1.fetchSessionsByUser)(userId);
        res.status(200).json({ sessions });
    }
    catch (error) {
        next(error);
    }
});
exports.getSessionsByUser = getSessionsByUser;
