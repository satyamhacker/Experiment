import mongoose from "mongoose";

// Replace 'your_database_url' with the actual connection URL of your MongoDB database
const dbUrl = "mongodb://127.0.0.1:27017/studentLibrary";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 seconds
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectToDatabase();

export default mongoose; // Export the mongoose instance for use in other files
