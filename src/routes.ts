import { Router } from 'express';

import {
  CreateUserController,
  CreateTagController,
  CreateComplimentController,
  AuthenticateUserController,
  ListTagsController,
  ListUsersController,
  ListComplimentsController,
  ListSentComplimentsController,
  ListReceivedComplimentsController
} from './controllers';

import { ensureAdmin, ensureAuthenticated } from './middlewares';

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const listComplimentsController = new ListComplimentsController();
const listSentComplimentsController = new ListSentComplimentsController();
const listReceivedComplimentsController = new ListReceivedComplimentsController();

const routes = Router();

routes.post('/login', authenticateUserController.handle);

routes.get(
  '/compliments/sent',
  ensureAuthenticated,
  listSentComplimentsController.handle
);

routes.get(
  '/compliments/received',
  ensureAuthenticated,
  listReceivedComplimentsController.handle
);

routes
  .route('/users')
  .get(ensureAuthenticated, ensureAdmin, listUsersController.handle)
  .post(createUserController.handle);

routes
  .route('/compliments')
  .get(ensureAuthenticated, ensureAdmin, listComplimentsController.handle)
  .post(ensureAuthenticated, createComplimentController.handle);

routes
  .route('/tags')
  .get(ensureAuthenticated, listTagsController.handle)
  .post(ensureAuthenticated, ensureAdmin, createTagController.handle);

export { routes };
