import { Subjects, Publisher, PaymentCreatedEvent } from '@aoticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
