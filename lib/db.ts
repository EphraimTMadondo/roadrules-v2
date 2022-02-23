import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

( BigInt.prototype as any ).toJSON = function () {
  return this.toString()
}

export const prisma =
  global.prisma ||
  new PrismaClient( {
    log: [ 'query' ],
  } );

if ( process.env.NODE_ENV !== 'production' )
  global.prisma = prisma;