import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
  const instance = await mongoose.connect(MONGO_URL);
  console.log(`MongoDB Connected :${instance.connection.host}`);
  } catch (error) {
    console.log("error connecting MongoDB",error)
  }
};
