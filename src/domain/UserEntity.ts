import type { AddressEntity } from './AddressEntity';

export type UserTitle = 'Mr' | 'Mrs';

export interface DateOfBirthEntity {
  day: string;
  month: string;
  year: string;
}

export interface UserEntity {
  name: string;
  email: string;
  password: string;

  title: UserTitle;
  dateOfBirth: DateOfBirthEntity;

  newsletter: boolean;
  specialOffers: boolean;

  address: AddressEntity;
}
