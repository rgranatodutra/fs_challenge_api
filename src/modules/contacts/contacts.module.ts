import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsRepository } from './repositories/contacts.abstract.repository';
import { ContactsPrismaRepository } from './repositories/contacts.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';

@Module({
	controllers: [
		ContactsController
	],
	providers: [
		ContactsService,
		PrismaService,
		{
			provide: ContactsRepository,
			useClass: ContactsPrismaRepository
		}
	],
	imports: [
		ClientsModule
	]
})
export class ContactsModule { }
