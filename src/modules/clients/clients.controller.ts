import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) { }

	@Post()
	public async create(
		@Body() createClientDto: CreateClientDto
	) {
		return await this.clientsService.create(createClientDto);
	}

	@Get()
	public async findAll() {
		return await this.clientsService.findAll();
	}

	@Get(':id')
	public async findOne(
		@Param('id') id: string
	) {
		return await this.clientsService.findOne(+id);
	}

	@Patch(':id')
	public async update(
		@Param('id') id: string,
		@Body() updateClientDto: UpdateClientDto
	) {
		return await this.clientsService.update(+id, updateClientDto);
	}

	@Delete(':id')
	public async remove(
		@Param('id') id: string
	) {
		return await this.clientsService.remove(+id);
	}
}
