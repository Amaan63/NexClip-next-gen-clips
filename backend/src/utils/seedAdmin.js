import bcrypt from "bcrypt";
import User from "../models/user.js";

const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Ahmed#619", 10);

    await User.create({
      username: "Ahmed619",
      password: hashedPassword,
      role: "admin", // 👈 assign role
    });

    console.log("✅ Default admin created: Ahmed619 / Ahmed#619");
  } else {
    console.log("ℹ️ Admin already exists");
  }
};

export default seedAdmin;
