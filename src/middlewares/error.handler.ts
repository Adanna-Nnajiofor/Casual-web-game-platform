import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  // Ensure we're sending JSON responses
  res.setHeader("Content-Type", "application/json");

  if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Validation Error",
      errors: err.errors,
    });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({
      message: "Invalid ID format",
    });
    return;
  }

  if (err.code === 11000) {
    res.status(409).json({
      message: "Duplicate key error",
      field: Object.keys(err.keyValue)[0],
    });
    return;
  }

  // Default error
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export { errorHandler };
