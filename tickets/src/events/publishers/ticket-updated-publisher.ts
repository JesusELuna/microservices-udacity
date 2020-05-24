import { Publisher, Subjects, TicketUpdatedEvent } from '@ovtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}