import bcrypt from "bcrypt";
import User from "../models/user.js";

const seedUser = async () => {
  const existingUser = await User.findOne({ username: "Ahmed619" });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("Ahmed#619", 10);

    await User.create({
      username: "Ahmed619",
      password: hashedPassword,
    });

    console.log(`✅ Default user created: admin / password123`);
  }
};

export default seedUser;
