import "dotenv/config";
import connectDB from "../src/config/db";
import User from "../src/models/user.model";

const fixIndex = async () => {
  try {
    await connectDB();
    console.log(" Connected to MongoDB");

    const indexes = await User.collection.indexes();
    const hasFirebaseUidIndex = indexes.some(
      (index) => index.name === "firebaseUid_1"
    );

    if (hasFirebaseUidIndex) {
      await User.collection.dropIndex("firebaseUid_1");
      console.log(" Dropped old index 'firebaseUid_1'");
    } else {
      console.log(" Index 'firebaseUid_1' does not exist. Skipping drop.");
    }

    await User.collection.createIndex(
      { firebaseUid: 1 },
      { unique: true, sparse: true }
    );
    console.log(" Created new sparse unique index on 'firebaseUid'");

    process.exit(0);
  } catch (error: any) {
    console.error(" Error fixing index:", error.message);
    process.exit(1);
  }
};

fixIndex();
