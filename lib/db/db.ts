import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error: ${e}`);
    process.exit(1);
  }
};
