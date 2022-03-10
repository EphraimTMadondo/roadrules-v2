/** *************************************************************************** */

import { DataModel } from '.';

/** *************************************************************************** */

export interface Nuance {
  username: string;
  pin: string;
  kind: 'Admin' | 'Learner';

  fullName: string;
  phoneNumber: string;
  activationCode: string;
  location: string;
}

export interface UserInfo {
  userId: number;
  username: string;
  kind: Nuance['kind'];

  fullName?: string;
}
export interface OldUser extends DataModel, Nuance {}

/** *************************************************************************** */
