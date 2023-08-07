import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.abstract.repository';
import { Contact } from './entities/contact.entity';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class ContactsService {
	constructor(
		private repository: ContactsRepository,
		private clientsService: ClientsService
	) { }

	public async create(clientId: number, data: CreateContactDto): Promise<Contact> {
		await this.clientsService.findOne(clientId);

		const findDuplicatedEmail = data.email && await this.repository.getMany({
			email: data.email
		});

		if (findDuplicatedEmail?.length) {
			throw new ConflictException("Email already registered");
		}

		const findDuplicatedPhone = data.phone && await this.repository.getMany({
			phone: data.phone
		});

		if (findDuplicatedPhone?.length) {
			throw new ConflictException("Phone already registered");
		}

		const createdContact = await this.repository.create(clientId, data);

		if (!createdContact) {
			throw new InternalServerErrorException("Failed to create client");
		}

		return createdContact;
	}

	public async findAllByClient(clientId: number): Promise<Array<Contact>> {
		return await this.repository.displayAllByClient(clientId);
	}

	public async update(contactId: number, data: UpdateContactDto) {
		const findContact = await this.repository.getOneById(contactId);

		if (!findContact) {
			throw new NotFoundException("Contact not found")
		}

		const findDuplicatedEmail = data.email && await this.repository.getMany({
			email: data.email
		});

		if (findDuplicatedEmail?.length) {
			throw new ConflictException("Email already registered");
		}

		const findDuplicatedPhone = data.phone && await this.repository.getMany({
			phone: data.phone
		});

		if (findDuplicatedPhone?.length) {
			throw new ConflictException("Phone already registered");
		}

		return await this.repository.update(contactId, data);
	}

	public async remove(id: number) {
		const findContact = await this.repository.getOneById(id);
		await this.repository.delete(id);

		return {
			isDeleted: true,
			deletedContact: findContact
		}
	}
}
