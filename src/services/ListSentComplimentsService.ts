import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

class ListSentComplimentsService {
  async execute(user_sender_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_sender_id }
    });

    return compliments;
  }
}

export { ListSentComplimentsService };
