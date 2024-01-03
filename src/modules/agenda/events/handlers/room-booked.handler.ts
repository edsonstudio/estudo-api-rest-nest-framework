import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../room-booked.event";

@EventsHandler(RoomBookedEvent)
export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {
    handle(event: RoomBookedEvent) {
        console.log('RoomBookedEvent:handle - Manipulando o evento Room Booked...');
    }
}