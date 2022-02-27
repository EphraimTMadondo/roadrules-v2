import { minusWeeksFromDate } from "./dates";
import { prisma } from "./db";


export async function getLastWeekResponseNumbers ( currentDate: Date ) {

  const responses = await prisma.response.findMany( {
    where: {
      createdAt: {
        gt: minusWeeksFromDate( currentDate, 1 ).getTime()
      }
    }
  } );

  const numCorrect = responses
    .filter( response => response.correct )
    .length;

  const numWrong = responses
    .filter( response => !response.correct )
    .length;

  return { numCorrect, numWrong };

}