import { BaseContext, createRouter } from '../create-router';
import { provinceRoutes } from './province';
import { responseRoutes } from './response';
import { userRoutes } from './user';

export const appRoutes = createRouter<BaseContext>()
  .merge('response.', responseRoutes)
  .merge('user.', userRoutes)
  .merge('province.', provinceRoutes);
