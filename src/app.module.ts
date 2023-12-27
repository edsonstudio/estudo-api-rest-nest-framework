import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('CONNECTION_STRING'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
