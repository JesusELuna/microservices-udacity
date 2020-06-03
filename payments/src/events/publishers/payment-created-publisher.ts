import { Subjects, Publisher, PaymentCreatedEvent } from '@ovtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}