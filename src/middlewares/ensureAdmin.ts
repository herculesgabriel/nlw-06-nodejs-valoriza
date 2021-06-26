import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';

async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request.user;

  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne(user_id);

  if (user?.admin) {
    return next();
  }

  response.status(403).json({ error: "You don't have permission to do that" });
}

export { ensureAdmin };
