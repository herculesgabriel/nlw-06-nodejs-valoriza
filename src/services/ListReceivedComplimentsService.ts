import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

class ListReceivedComplimentsService {
  async execute(user_sender_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_receiver_id: user_sender_id }
    });

    return compliments;
  }
}

export { ListReceivedComplimentsService };
