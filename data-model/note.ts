/** *************************************************************************** */

import { DataModel } from '.';

/** *************************************************************************** */

export interface Nuance {
  refNumber: number;
  title: string;
  html: string;
}
export interface OldNote extends DataModel, Nuance {}

/** *************************************************************************** */
