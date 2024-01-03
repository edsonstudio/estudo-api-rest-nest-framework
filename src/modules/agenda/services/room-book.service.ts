import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";

@Injectable()
export class RoomBookService {
    constructor(private readonly commandBus: CommandBus) { }

    async Book(command: BookRoomCommand) {
        console.log('RoomBookService:Book - Executando o serviço...');

        return await this.commandBus.execute(
            command,
            // comando 2,
            // comando 3,
            // etc...
        );
    }
}