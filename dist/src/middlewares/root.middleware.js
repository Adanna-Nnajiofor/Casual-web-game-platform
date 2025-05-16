"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootMiddleware = void 0;
const rootMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        "https://ezzzinne.github.io",
        "http://localhost:5173",
        "http://localhost:5000",
        "http://localhost:3000",
    ];
    // Set CORS headers
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    else {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Handle preflight
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
};
exports.rootMiddleware = rootMiddleware;
