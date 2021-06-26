import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from '../repositories/UsersRepository';

interface IAuthenticateUserData {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserData) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) throw new Error('You must provide an email');
    if (!password) throw new Error('You must provide a password');

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error("The e-mail provided doesn't belong to any user");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('The email/password is wrong');
    }

    const { SECRET } = process.env;

    if (!SECRET) {
      throw new Error('Internal error: contact the server admin');
    }

    const token = sign({ email: user.email }, SECRET, {
      subject: user.id,
      algorithm: 'HS256',
      expiresIn: '1d'
    });

    return token;
  }
}

export { AuthenticateUserService };
