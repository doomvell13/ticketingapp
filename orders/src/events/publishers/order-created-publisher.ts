import { Publisher, OrderCreatedEvent, Subjects } from '@aoticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
