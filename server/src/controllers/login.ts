import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { generateAccessToken } from "../helpers/index";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user)
    return res.status(400).json({ error: "Invalid email or Password." });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const userObj = {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };

  const accessToken = generateAccessToken(userObj);

  res.cookie(ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
  });

  const refreshToken = jwt.sign({ user }, JWT_SECRET!, { expiresIn: "1d" });

  res.cookie(REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
  });

  // TODO: IMPLEMENT JWT
  return res.status(200).json({
    message: "Login successfully!",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};
