import * as jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../constants";
import { Request, Response, NextFunction } from "express";

export const AuthenticateTokenMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_SECRET!, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid Token!" }); //invalid token
    req.user = decoded.user;
    next();
  });
};
