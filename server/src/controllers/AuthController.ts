import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { SALT } from "../constants";
import bcrypt from "bcrypt";
import { generateRandomAvatarGifs } from "../helpers/index";
import { User } from "../helpers/types";

export const signupController = async (req: Request, res: Response) => {
  const { displayname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    const randomGif = generateRandomAvatarGifs();

    const isExistingDisplayName = await UserModel.findOne({
      displayname: displayname,
    });

    if (isExistingDisplayName)
      return res.status(400).json({ error: "Display name is already taken." });

    const isExistingEmail = await UserModel.findOne({ email: email });

    if (isExistingEmail)
      return res.status(400).json({ error: "Email is already taken." });

    const newUser = {
      displayname: displayname,
      email: email,
      password: hashedPassword,
      imgURL: randomGif,
    };

    const user = (await UserModel.create(newUser)) as User;

    if (user) {
      const userObj = {
        _id: user._id,
        displayname: user.displayname,
        email: user.email,
        imgURL: randomGif,
      };

      return res.status(200).json({
        ...userObj,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user)
    return res.status(400).json({ error: "Invalid email or Password." });

  const isMatch = await bcrypt.compare(password, user.password.toString());

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const userObj: User = {
    _id: user._id,
    displayname: user.displayname.toString(),
    email: user.email.toString(),
    imgURL: user.imgURL!.toString(),
  };

  return res.status(200).json({
    ...userObj,
  });
};

export const logoutController = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Successfully logged out!",
  });
};

export const isEmailExistsController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const isExistingEmail = await UserModel.findOne({ email: email });

    if (isExistingEmail)
      return res.status(400).json({ error: "Email is already taken." });

    return res.status(200).json({ success: "Email is available." });
  } catch (error) {
    console.error(error);
  }
};

export const isDisplayNameExistsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { displayname } = req.body;

    const isExistingDisplayName = await UserModel.findOne({
      displayname: displayname,
    });

    if (isExistingDisplayName)
      return res.status(400).json({ error: "Display name is already taken." });

    return res.status(200).json({ success: "Display name is available." });
  } catch (error) {
    console.error(error);
  }
};
