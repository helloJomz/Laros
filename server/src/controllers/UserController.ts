import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const getUserByDisplayNameController = async (
  req: Request,
  res: Response
) => {
  const { displayname } = req.body;

  const user = await UserModel.findOne({ displayname: displayname });

  if (user && displayname !== "") {
    const userObj = {
      userid: user._id,
      displayname: user.displayname,
      email: user.email,
      imgURL: user.imgURL,
    };

    return res.status(200).json({ ...userObj });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};
