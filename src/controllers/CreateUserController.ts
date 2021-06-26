import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, admin, password });

    response.status(201).json(user);
  }
}

export { CreateUserController };
