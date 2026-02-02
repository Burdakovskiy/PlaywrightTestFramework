import type { AddressEntity } from '../../domain/AddressEntity';

export class AddressFactoryEntity {
  static default(): AddressEntity {
    return {
      firstName: 'Dmitriy',
      lastName: 'QA',
      company: 'QA Labs',
      address1: 'Main Street 1',
      address2: 'Apt 10',
      country: 'India',
      state: 'Bavaria',
      city: 'Munich',
      zipcode: '80331',
      mobileNumber: '+4915112345678',
    };
  }
}
