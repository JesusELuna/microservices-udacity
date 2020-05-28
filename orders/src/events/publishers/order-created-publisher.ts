import { Publisher, OrderCreatedEvent, Subjects } from '@ovtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}