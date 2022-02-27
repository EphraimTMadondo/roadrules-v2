import { z } from 'zod';

export const optionIdSchema = z.union( [
  z.literal( "option1" ),
  z.literal( "option2" ),
  z.literal( "option3" ),
] );

export type OptionId = z.infer<typeof optionIdSchema>;

interface ThreeOptioned {
  option1: string;
  option2: string;
  option3: string;
}

export function getOptionDisplayValue ( optionId: OptionId ) {

  const map: [ OptionId, string ][] = [
    [ "option1", "A" ],
    [ "option2", "B" ],
    [ "option3", "C" ],
  ];

  const match = map
    .find( pair => pair[ 0 ] === optionId );

  return match?.[ 1 ] || "";

}

export function getOptionContent ( optionId: OptionId, question: ThreeOptioned ) {

  const map: [ OptionId, string ][] = [
    [ "option1", question.option1, ],
    [ "option2", question.option2, ],
    [ "option3", question.option3, ]
  ];

  const match = map
    .find( pair => pair[ 0 ] === optionId );

  return match?.[ 1 ] || "";

}