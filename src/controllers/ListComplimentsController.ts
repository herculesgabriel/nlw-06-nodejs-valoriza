import { Request, Response } from 'express';

import { ListComplimentsService } from '../services/ListComplimentsService';

class ListComplimentsController {
  async handle(_request: Request, response: Response) {
    const listComplimentsService = new ListComplimentsService();
    const compliments = await listComplimentsService.execute();

    response.status(200).json(compliments);
  }
}

export { ListComplimentsController };
