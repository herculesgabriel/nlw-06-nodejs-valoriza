import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

interface ICreateComplimentData {
  message: string;
  user_sender_id: string;
  user_receiver_id: string;
  tag_id: string;
}

class CreateComplimentService {
  async execute({
    message,
    user_sender_id,
    user_receiver_id,
    tag_id
  }: ICreateComplimentData) {
    if (!message) throw new Error('You must provide a message');
    if (!user_receiver_id) throw new Error('You must provide an user id');
    if (!tag_id) throw new Error('You must provide a tag id');

    if (user_sender_id === user_receiver_id) {
      throw new Error("You can't create a compliment for yourself");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userReceiver = await usersRepository.findOne(user_receiver_id);

    if (!userReceiver) {
      throw new Error('User does not exist');
    }

    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliment = complimentsRepository.create({
      message,
      user_sender_id,
      user_receiver_id,
      tag_id
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
