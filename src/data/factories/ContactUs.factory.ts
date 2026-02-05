import type { ContactUsEntity } from '../../domain/ContactUsEntity';
import { Unique } from '../../utils/Unique';
import { TEST_FILE_PATHS } from '../../config/paths';

export class ContactUsDataFactory {
  static default(): ContactUsEntity {
    return {
      name: 'Dmytro',
      email: Unique.email('qa'),
      subject: 'Some subject',
      message: 'Some user feedback message',
      filePath: TEST_FILE_PATHS.contactUs,
    };
  }
}
