import "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      authentication?: JwtPayload;
    }
  }
}