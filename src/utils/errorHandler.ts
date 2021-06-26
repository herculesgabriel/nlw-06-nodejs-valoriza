import { Request, Response, NextFunction } from 'express';

// TODO create custom error class
function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof Error) {
    return response.status(400).json({ error: error.message });
  }

  response.status(500).json({ error: 'Internal server error' });
}

export { errorHandler };
