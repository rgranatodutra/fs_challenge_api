import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('')
export class ContactsController {
	constructor(
		private readonly contactsService: ContactsService,
	) { }

	@Post('clients/:clientId/contacts')
	public async create(
		@Param('clientId') clientId: string,
		@Body() data: CreateContactDto,
	) {
		return await this.contactsService.create(+clientId, data);
	}

	@Get('clients/:clientId/contacts')
	public async findAll(
		@Param('clientId') clientId: string,
	) {
		return await this.contactsService.findAllByClient(+clientId);
	}

	@Patch('contacts/:contactId')
	public async update(
		@Param('contactId') contactId: string,
		@Body() data: UpdateContactDto
	) {
		return await this.contactsService.update(+contactId, data);
	}

	@Delete('contacts/:contactId')
	public async remove(
		@Param('contactId') contactId: string,
	) {
		return await this.contactsService.remove(+contactId);
	}
}
