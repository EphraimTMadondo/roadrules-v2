/** *************************************************************************** */

import { DataModel } from '.';

/** *************************************************************************** */

export interface Nuance {
  refNumber: number;
  text: string;
  image: string;

  option1: string;
  option2: string;
  option3: string;

  correctOption: string;
  correctlyAnswered: number;
  incorrectlyAnswered: number;

  questionTypeId: number;
  explanation: string;
}
export interface OldQuestion extends DataModel, Nuance {}

/** *************************************************************************** */
