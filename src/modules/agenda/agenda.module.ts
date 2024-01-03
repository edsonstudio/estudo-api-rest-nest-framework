import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AgendaController } from './controllers/agenda.controller';

import { RoomBookService } from './services/room-book.service';

import { RoomRepository } from './repositories/room.repository';

import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
    imports: [
        CqrsModule
    ],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers, // imports agrupados num arquivo index.ts
        ...EventHandlers // imports agrupados num arquivo index.ts
    ]
})
export class AgendaModule {}
