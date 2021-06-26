import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const { SECRET } = process.env;

interface IPayload {
  email: string;
  sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('Token is missing');
  }

  const [_bearer, token] = authorization.split(' ');

  if (!SECRET) {
    throw new Error('Internal error: contact the server admin');
  }

  try {
    const data = verify(token, SECRET);

    request.user = {
      user_id: (data as IPayload).sub,
      email: (data as IPayload).email
    };

    next();
  } catch (error) {
    response.status(401).json({ error: 'You must be authenticated' });
  }
}

export { ensureAuthenticated };
