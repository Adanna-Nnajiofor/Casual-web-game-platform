export const handleError = (error: any, location: string) => {
  console.error(`[${location}]`, {
    message: error.message,
    stack: error.stack,
  });
};
