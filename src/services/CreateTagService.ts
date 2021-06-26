import { getCustomRepository } from 'typeorm';

import { TagsRepository } from '../repositories/TagsRepository';

interface ITagData {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagData) {
    const tagsRepository = getCustomRepository(TagsRepository);

    if (!name) {
      throw new Error('You must provide a name');
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error('Tag already exists');
    }

    // TODO verificar se é admin

    const tag = tagsRepository.create({ name });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
