import { Request, Response } from 'express';

import { ListReceivedComplimentsService } from '../services/ListReceivedComplimentsService';

class ListReceivedComplimentsController {
  async handle(request: Request, response: Response) {
    const { user } = request;

    const listReceivedComplimentsService = new ListReceivedComplimentsService();
    const compliments = await listReceivedComplimentsService.execute(user.user_id);

    response.status(200).json(compliments);
  }
}

export { ListReceivedComplimentsController };
