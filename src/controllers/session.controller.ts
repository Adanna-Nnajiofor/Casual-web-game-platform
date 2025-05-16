import { Request, Response, NextFunction } from "express";
import {
  createAndSaveSession,
  fetchSessionsByUser,
} from "../services/session.service";

export const saveSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await createAndSaveSession(req);
    res.status(201).json({ message: "Session saved", session });
  } catch (error) {
    next(error);
  }
};

export const getSessionsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const sessions = await fetchSessionsByUser(userId);
    res.status(200).json({ sessions });
  } catch (error) {
    next(error);
  }
};
