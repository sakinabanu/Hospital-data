import mongoose from "mongoose";
import config from "config";

const dbConnect = async () => {
  try {
    // One Line Syntax
    await mongoose.connect(config.get("DB_URI"));
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();