import { Router } from "express";
import { UserModel } from "../models/User";
import bcrypt from "bcrypt";

const router = Router();
const SALT = 10;

// FOR SIGNUP USERS
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const isExistingUser = await UserModel.findOne({ email: email });

    if (isExistingUser)
      return res.status(400).json({ error: "Email is already taken." });

    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    };

    await UserModel.create(newUser);
    return res
      .status(200)
      .json({ message: "Successfully registered an account." });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user)
    return res.status(400).json({ error: "Invalid email or Password." });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // TODO: IMPLEMENT JWT
  return res.status(200).json({
    firstname: user.firstname,
    lastname: user.lastname,
    id: user._id,
  });
});

export default router;
