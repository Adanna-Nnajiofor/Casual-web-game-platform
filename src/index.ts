import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

export const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` MongoDB connected: Production mode`);
      console.log(` Server running on port ${PORT}`);
      if (process.env.RENDER_EXTERNAL_URL) {
        console.log(` Live at: ${process.env.RENDER_EXTERNAL_URL}`);
      }
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
