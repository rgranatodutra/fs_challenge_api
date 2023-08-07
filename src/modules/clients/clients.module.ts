import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientsRepository } from './repositories/clients.abstract.repository';
import { ClientsPrismaRepository } from './repositories/clients.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
	controllers: [
		ClientsController
	],
	providers: [
		ClientsService,
		PrismaService,
		{
			provide: ClientsRepository,
			useClass: ClientsPrismaRepository
		}
	],
	exports: [
		ClientsService
	]
})
export class ClientsModule { }
