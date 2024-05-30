import * as jwt from "jsonwebtoken";
import { ACCESS_SECRET, ACCESS_TOKEN_STRING } from "../constants";
import { Request, Response, NextFunction } from "express";

export const AuthenticateTokenMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const accessToken: string = cookies[ACCESS_TOKEN_STRING];

  if (!accessToken)
    return res.status(403).json({ message: "No token available." });

  jwt.verify(accessToken, ACCESS_SECRET!, (err: any, user: any) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Access Denied! Invalid or expired token." });
    }
    req.user = user.user;
    next();
  });
};
