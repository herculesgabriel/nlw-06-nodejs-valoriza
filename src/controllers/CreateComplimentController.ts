import { Request, Response } from 'express';

import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { message, user_receiver_id, tag_id } = request.body;
    const { user_id } = request.user;

    const createComplimentService = new CreateComplimentService();
    const compliment = await createComplimentService.execute({
      message,
      user_sender_id: user_id,
      user_receiver_id,
      tag_id
    });

    response.status(201).json(compliment);
  }
}

export { CreateComplimentController };
