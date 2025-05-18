/// <reference types="express" />
/// <reference types="multer" />

import { IUser } from "../models/user.model";
import { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | DecodedIdToken;
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
      file?: Express.Multer.File;
    }
  }
}

export {};
