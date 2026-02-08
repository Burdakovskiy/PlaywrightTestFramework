import type { PaymentDataEntity } from '../../domain/PaymentDataEntity';
import type { UserEntity } from '../../domain/UserEntity';

export class PaymentDataFactory {
  static createPaymentData(user: Pick<UserEntity, 'name'>): PaymentDataEntity {
    return {
      nameOnCard: user.name,
      cardNumber: '4111111111111111',
      cvc: '123',
      expirationMonth: '12',
      expirationYear: '2030',
      orderComment: 'There is some comment about order details',
    };
  }
}
