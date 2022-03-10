/** *************************************************************************** */

import { DataModel } from '.';

/** *************************************************************************** */

export interface Nuance {
  title: string;
  image: string;

  html: string;

  rating: number;
  city: string;

  latitude: number;
  longitude: number;

  cost: number;

  phone: string;
  whatsapp: string;
  messenger: string;
}

export interface OldDrivingSchool extends DataModel, Nuance {}
/** *************************************************************************** */
