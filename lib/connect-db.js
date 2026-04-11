import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};

export default connectMongo;
