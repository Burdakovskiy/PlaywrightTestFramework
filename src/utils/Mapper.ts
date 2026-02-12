import { UserEntity } from '../domain/UserEntity';

export const Mapper = {
  mapUserToAccountForm(user: UserEntity): Record<string, string> {
    return {
      name: user.name,
      email: user.email,
      password: user.password,

      title: user.title,
      birth_date: user.dateOfBirth.day,
      birth_month: user.dateOfBirth.month,
      birth_year: user.dateOfBirth.year,

      firstname: user.address.firstName,
      lastname: user.address.lastName,
      company: user.address.company,
      address1: user.address.address1,
      address2: user.address.address2 ?? '',
      country: user.address.country,
      zipcode: user.address.zipcode,
      state: user.address.state,
      city: user.address.city,
      mobile_number: user.address.mobileNumber,
    };
  },
};
