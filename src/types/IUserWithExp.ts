import { IUser } from "../models/user.model";
export interface IUserWithExp extends IUser {
  exp: number;
}
