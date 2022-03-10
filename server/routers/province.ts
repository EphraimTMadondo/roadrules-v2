import { prisma } from '../../lib/db';
import { createRouter } from '../create-router';

export const provinceRoutes = createRouter().query('list', {
  async resolve() {
    const countries = await prisma.country.findMany({
      include: {
        provinces: true,
      },
    });

    return { countries };
  },
});
