import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';

import { UsersRepository } from '../repositories/UsersRepository';

interface ICreateUserData {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: ICreateUserData) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!name) throw new Error('You must provide a name');
    if (!email) throw new Error('You must provide an email');
    if (!password) throw new Error('You must provide a password');

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 10);

    const user = usersRepository.create({ name, email, password: passwordHash, admin });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
