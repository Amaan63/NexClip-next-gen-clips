import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
import app from "./src/app.js";
import seedUser from "./src/utils/seedUser.js";
import seedAdmin from "./src/utils/seedAdmin.js";

// configuring dotnev
dotenv.config();

// Connecting to Database
ConnectDB().then(() => {
  //seedUser(); //to add a default user
  //seedAdmin(); // to add a default admin
});

// Getting the Port from the env
const PORT = process.env.PORT || 5000;

// listening the app
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
