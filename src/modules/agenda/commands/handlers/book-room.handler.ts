import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookRoomCommand } from "../book-room.command";
import { RoomRepository } from "../../repositories/room.repository";
import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    constructor(private readonly repository: RoomRepository) { }

    async execute(command: BookRoomCommand) {
        const room = await this.repository.checkAvaliability(command.roomId, command.date);

        if(room) {
            room.book(command.customerId, command.date);
            await this.repository.book(room);
            return;
        }

        throw new HttpException("Sala não disponível", HttpStatus.BAD_REQUEST);
    }
}