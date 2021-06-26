import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { UsersRepository } from '../repositories/UsersRepository';

class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUsersService };
