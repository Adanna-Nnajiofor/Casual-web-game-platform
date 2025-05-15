import { CorsOptions } from "cors";

const allowedOrigins = [
  "https://ezzzinne.github.io",
  "http://localhost:5173",
  "http://localhost:5000",
  "https://casual-web-game-platform.onrender.com",
  "http://casual-web-game-platform.onrender.com",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "https://casual-web-game.onrender.com",
  "http://casual-web-game.onrender.com",
];

export const corsConfig: CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Auth-Token",
  ],
  exposedHeaders: ["Authorization", "X-Auth-Token"],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export const setCorsHeaders = (req: any, res: any) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
    );
    res.header("Access-Control-Expose-Headers", "Authorization, X-Auth-Token");
    res.header("Vary", "Origin");
  }
};
