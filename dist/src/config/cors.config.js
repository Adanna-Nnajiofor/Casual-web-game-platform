"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCorsHeaders = exports.corsConfig = void 0;
const allowedOrigins = [
    "https://ezzzinne.github.io",
    "http://localhost:5173",
    "http://localhost:5000",
    "https://casual-web-game-platform.onrender.com",
    "http://casual-web-game-platform.onrender.com",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
];
exports.corsConfig = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman or curl requests)
        if (!origin) {
            callback(null, true);
            return;
        }
        try {
            // Parse the origin to validate it's a proper URL
            const url = new URL(origin);
            if (allowedOrigins.includes(url.origin)) {
                callback(null, true);
            }
            else {
                console.warn(`Blocked request from unauthorized origin: ${origin}`);
                callback(new Error("Not allowed by CORS"));
            }
        }
        catch (e) {
            console.error(`Invalid origin format: ${origin}`);
            callback(new Error("Invalid origin format"));
        }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "X-Auth-Token",
        "Access-Control-Allow-Headers",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ],
    exposedHeaders: ["Authorization", "X-Auth-Token"],
    credentials: true,
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
const setCorsHeaders = (req, res) => {
    const origin = req.headers.origin;
    // Only set CORS headers if origin is valid
    if (origin) {
        try {
            const url = new URL(origin);
            if (allowedOrigins.includes(url.origin)) {
                // Set standard CORS headers
                res.header("Access-Control-Allow-Origin", url.origin);
                res.header("Access-Control-Allow-Credentials", "true");
                res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
                res.header("Access-Control-Expose-Headers", "Authorization, X-Auth-Token");
                res.header("Vary", "Origin");
            }
            else {
                console.warn(`Blocked request from unauthorized origin: ${origin}`);
            }
        }
        catch (e) {
            console.error(`Invalid origin format: ${origin}`);
        }
    }
};
exports.setCorsHeaders = setCorsHeaders;
