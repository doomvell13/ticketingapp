import { Subjects, Publisher, OrderCancelledEvent } from '@aoticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
