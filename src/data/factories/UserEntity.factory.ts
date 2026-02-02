import type { UserEntity } from '../../domain/UserEntity';
import { Unique } from '../../utils/Unique';
import { AddressFactoryEntity } from './AddressEntity.factory';

export class UserEntityFactory {
  static createUniqueUser(overrides?: Partial<UserEntity>): UserEntity {
    const base: UserEntity = {
      name: 'Dmitriy',
      email: Unique.email('qa'),
      password: 'P@ssw0rd12345',

      title: 'Mr',
      dateOfBirth: {
        day: '10',
        month: 'May',
        year: '1995',
      },

      newsletter: true,
      specialOffers: true,

      address: AddressFactoryEntity.default(),
    };

    return {
      ...base,
      ...overrides,
      address: {
        ...base.address,
        ...(overrides?.address ?? {}),
      },
    };
  }
}
