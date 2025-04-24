import { CreateUserInput } from "../types/user";
import User from "../models/user.model";

export const createUser = async (data: CreateUserInput) => {
  const user = new User(data);
  await user.save();
  return user;
};
