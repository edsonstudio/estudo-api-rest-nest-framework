import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { RoomBookService } from "../services/room-book.service";

import { BookRoomDto } from "../dtos/book-room.dto";

import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { BookRoomCommand } from "../commands/book-room.command";
import { ResultDto } from "src/shared/dtos/result.dto";

@ApiTags('Rooms') // Tag para agrupar endpoints
@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    @ApiOperation({ summary: 'Agendar salas', description: 'Reserva salas do petshop para hospedar o seu animal de estimação' })
    // @UseGuards(JwtAuthGuard) //TODO: Configurar o useGuards para este modulo.
    async Book(@Req() request, @Body() model: BookRoomDto) {
        try {
            var command = new BookRoomCommand(request.user.document, model.roomId, model.date);
            await this.service.Book(command);
        } catch (error) {
            console.log('error: ', error);
            throw new HttpException(new ResultDto('Não foi possível reservar sua sala', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}