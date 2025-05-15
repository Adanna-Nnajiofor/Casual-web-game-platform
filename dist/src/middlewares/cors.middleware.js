"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureCors = void 0;
const ensureCors = (req, res, next) => {
    // Only log path, not full URL to avoid path-to-regexp issues
    console.log("CORS Middleware - Request:", {
        method: req.method,
        path: req.path,
    });
    const allowedOrigins = [
        "https://ezzzinne.github.io",
        "http://localhost:5173",
    ];
    const origin = req.headers.origin;
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        if (origin && allowedOrigins.includes(origin)) {
            setCorsHeaders(res, origin);
        }
        res.status(204).end();
        return;
    }
    // Handle actual request
    if (origin && allowedOrigins.includes(origin)) {
        setCorsHeaders(res, origin);
    }
    next();
};
exports.ensureCors = ensureCors;
function setCorsHeaders(res, origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With");
    res.header("Access-Control-Max-Age", "86400"); // 24 hours
    res.header("Vary", "Origin");
}
