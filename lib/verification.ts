export interface Inputs {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  provinceId: number;
  countryId: number | undefined;
  phoneNumber: string;
  code: string;
  pin: string;
  reEnterPin: string;
}
