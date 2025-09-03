import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      /*
        useNewUrlParser: true, // By Default in mongoose v6+
        useUnifiedTopology: true,
      */
    });
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default ConnectDB;
