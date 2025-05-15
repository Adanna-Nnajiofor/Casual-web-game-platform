/// <reference types="express" />
/// <reference types="multer" />

import { IUser } from "../models/user.model";
import { DecodedIdToken } from "firebase-admin/auth";
import { Request } from "express";
import { Multer } from "multer";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser | DecodedIdToken;
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
    file?: Express.Multer.File;
  }
}

export {};
