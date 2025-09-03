import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
import app from "./src/app.js";

// configuring dotnev
dotenv.config();

// Connecting to Database
ConnectDB();

// Getting the Port from the env
const PORT = process.env.PORT || 5000;

// listening the app
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
