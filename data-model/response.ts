/** *************************************************************************** */

import { DataModel } from '.';

/** *************************************************************************** */

export interface Nuance {
  questionId: number;
  userId: number;

  choice: string;
  correct: boolean;
}
export interface OldResponse extends DataModel, Nuance {}

/** *************************************************************************** */
