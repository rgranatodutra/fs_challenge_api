import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.abstract.repository';

@Injectable()
export class ClientsService {
	constructor(
		private repository: ClientsRepository
	) { }

	public async create(data: CreateClientDto) {
		return await this.repository.create(data);
	}

	public async findAll() {
		return await this.repository.displayAll();
	}

	public async findMany(data: UpdateClientDto) {
		return await this.repository.getMany(data);
	}

	public async findOne(id: number) {
		return await this.repository.getOneById(id);
	}

	public async update(id: number, data: UpdateClientDto) {
		return await this.repository.update(id, data);
	}

	public async remove(id: number) {
		return await this.repository.delete(id);
	}
}
