import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

class ListComplimentsService {
  async execute() {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find();

    return compliments;
  }
}

export { ListComplimentsService };
