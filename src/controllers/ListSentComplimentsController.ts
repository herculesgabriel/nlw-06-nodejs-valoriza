import { Request, Response } from 'express';

import { ListSentComplimentsService } from '../services/ListSentComplimentsService';

class ListSentComplimentsController {
  async handle(request: Request, response: Response) {
    const { user } = request;

    const listSentComplimentsService = new ListSentComplimentsService();
    const compliments = await listSentComplimentsService.execute(user.user_id);

    response.status(200).json(compliments);
  }
}

export { ListSentComplimentsController };
