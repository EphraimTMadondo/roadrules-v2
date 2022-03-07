import { createRouter } from '../create-router';
import { responseRoutes } from './response';

export const appRoutes = createRouter().merge('response.', responseRoutes);
