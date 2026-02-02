export type Country =
  | 'India'
  | 'United State'
  | 'Canada'
  | 'Australia'
  | 'Izrael'
  | 'New Zeland'
  | 'Singapore'
  | 'Germany';

export interface AddressEntity {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2?: string;
  country: Country;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}
