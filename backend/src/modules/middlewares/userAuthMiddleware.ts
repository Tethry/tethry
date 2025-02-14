import { Request, Response, NextFunction } from "express";
import { User } from "../schemas/user.collection";
import jwt from "jsonwebtoken";
import { ENVIRONMENT } from "../../common/config/environment";
const { JWT_SECRET } = ENVIRONMENT.APP;

export const userAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!JWT_SECRET) {
    res.status(500).json({ status: false, message: "Internal server error" });
    return;
  }

  if (!authorization) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  if (!authorization.startsWith("Bearer ")) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    const user = await User.findOne({ _id: (decoded as { id: string }).id });

    if (!user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    req.user = user._id as string;

    next();
  } catch (error) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }
};
