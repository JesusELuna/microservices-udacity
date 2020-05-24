import { Publisher, Subjects, TicketCreatedEvent } from '@ovtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}