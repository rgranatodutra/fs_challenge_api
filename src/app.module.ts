import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { DatabaseModule } from './database/database.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [ClientsModule, DatabaseModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
