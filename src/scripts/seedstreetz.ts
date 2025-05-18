// seed/seedStreetz.ts
import mongoose from "mongoose";
import connectDB from "../config/db"; // Adjust path as needed
import StreetzWord from "../models/Streetz";

const seedStreetz = async () => {
  try {
    await connectDB();
    await StreetzWord.deleteMany({}); // Clear old data

    const words = [
      /* paste full array here, see earlier message */
    ] as any;

    await StreetzWord.insertMany(words);
    console.log("🎉 Streetz game data inserted!");
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedStreetz();
