import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://edsonstudio:rud6JHpd8oqJJukV@cluster0.d8g8xgw.mongodb.net'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
