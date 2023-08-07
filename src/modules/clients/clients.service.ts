import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.abstract.repository';
import { DeleteClientResponse } from './interfaces/delete.response.interface';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
	constructor(
		private repository: ClientsRepository
	) { }

	public async create(data: CreateClientDto) {
		const findDuplicatedEmail = await this.repository.getMany({
			email: data.email
		});

		if (findDuplicatedEmail.length) {
			throw new ConflictException("Email already registered");
		}

		const findDuplicatedPhone = await this.repository.getMany({
			phone: data.phone
		});

		if (findDuplicatedPhone.length) {
			throw new ConflictException("Phone already registered");
		}

		const createdClient = await this.repository.create(data);

		if (!createdClient) {
			throw new InternalServerErrorException("Failed to create client");
		}

		return createdClient;
	}

	public async findAll() {
		return await this.repository.displayAll();
	}

	public async findMany(data: UpdateClientDto) {
		return await this.repository.getMany(data);
	}

	public async findOne(id: number): Promise<Client> {
		const findClient = await this.repository.getOneById(id);

		if (!findClient) {
			throw new NotFoundException("Client not found");
		}

		return findClient;
	}

	public async update(id: number, data: UpdateClientDto) {
		const findClient = await this.findOne(id);
		const updatedClient = findClient && await this.repository.update(id, data);

		return updatedClient;
	}

	public async remove(id: number): Promise<DeleteClientResponse> {
		const findClient = await this.findOne(id);
		await this.repository.delete(id);

		return {
			isDeleted: true,
			deletedClient: findClient
		}
	}
}
