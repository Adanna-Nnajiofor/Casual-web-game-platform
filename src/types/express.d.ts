import { IUser } from "../models/user.model";
import { DecodedIdToken } from "firebase-admin/auth";
import { Multer } from 'multer';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | DecodedIdToken;
      files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
    }
  }
}
