import { Injectable } from "@nestjs/common";
import { ClientsRepository } from "./clients.abstract.repository";
import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";
import { Client } from "../entities/client.entity";
import { PrismaService } from "src/database/prisma.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ClientsPrismaRepository implements ClientsRepository {
    constructor(
        private database: PrismaService,
    ) { }

    public async create(data: CreateClientDto): Promise<Client> {
        const client = new Client();
        Object.assign(client, data);

        const newClient = await this.database.client.create({ data: client });

        return plainToInstance(Client, newClient);
    }

    public async update(id: number, data: UpdateClientDto): Promise<Client> {
        const updatedClient = await this.database.client.update({
            where: { id }, data: { ...data, updatedAt: new Date() }
        });

        return plainToInstance(Client, updatedClient);
    }

    public async delete(id: number): Promise<void> {
        await this.database.client.delete({
            where: { id }
        });
    }

    public async displayAll(): Promise<Client[]> {
        const clients = await this.database.client.findMany();

        return plainToInstance(Client, clients);
    }

    public async getMany(data: UpdateClientDto): Promise<Client[]> {
        const findClients = await this.database.client.findMany({
            where: { ...data }
        });

        return plainToInstance(Client, findClients);
    }

    public async getOneById(id: number): Promise<Client> {
        const findClient = await this.database.client.findUnique({
            where: { id }
        });

        return plainToInstance(Client, findClient);
    }
}