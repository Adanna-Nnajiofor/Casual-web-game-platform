import { IUser } from "../../models/user.model";
import { DecodedIdToken } from "firebase-admin/auth";
import { Request } from "express";

declare global {
  namespace Express {
    interface Multer {
      File: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      };
    }

    interface Request {
      user?: IUser | DecodedIdToken;
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}

export {};
