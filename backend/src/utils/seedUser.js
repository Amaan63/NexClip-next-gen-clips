import bcrypt from "bcrypt";
import User from "../models/user.js";

const seedUser = async () => {
  const existingUser = await User.findOne({ username: "Amaan619" });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("Amaan#619", 10);

    await User.create({
      username: "Amaan619",
      password: hashedPassword,
      role: "user", // 👈 assign role
    });

    console.log(`✅ Default user created: admin / password123`);
  }
};

export default seedUser;
