import { Publisher, OrderCancelledEvent, Subjects } from '@ovtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}