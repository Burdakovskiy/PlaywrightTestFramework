import type { UserEntity } from '../../domain/UserEntity';
import type { AddressEntity } from '../../domain/AddressEntity';
import { UserEntityFactory } from '../factories/UserEntity.factory';

export class UserEntityBuilder {
  private user: UserEntity;

  constructor() {
    this.user = UserEntityFactory.createUniqueUser();
  }

  static create(): UserEntityBuilder {
    return new UserEntityBuilder();
  }

  withName(name: string): UserEntityBuilder {
    this.user = { ...this.user, name };
    return this;
  }

  withPassword(password: string): UserEntityBuilder {
    this.user = { ...this.user, password };
    return this;
  }

  withNewsletter(enabled: boolean): UserEntityBuilder {
    this.user = { ...this.user, newsletter: enabled };
    return this;
  }

  withSpecialOffers(enabled: boolean): UserEntityBuilder {
    this.user = { ...this.user, specialOffers: enabled };
    return this;
  }

  withTitle(title: UserEntity['title']): UserEntityBuilder {
    this.user = { ...this.user, title };
    return this;
  }

  withDob(day: string, month: string, year: string): UserEntityBuilder {
    this.user = { ...this.user, dateOfBirth: { day, month, year } };
    return this;
  }

  withAddress(address: Partial<AddressEntity>): UserEntityBuilder {
    this.user = {
      ...this.user,
      address: { ...this.user.address, ...address },
    };
    return this;
  }

  build(): UserEntity {
    return this.user;
  }
}
