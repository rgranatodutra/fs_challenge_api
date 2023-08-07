import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";
import { Client } from "../entities/client.entity";

export abstract class ClientsRepository {
    public abstract create(data: CreateClientDto): Promise<Client>;
    public abstract update(clientId: number, data: UpdateClientDto): Promise<Client>;
    public abstract delete(clientId: number): Promise<void>;
    public abstract displayAll(): Promise<Array<Client>>;
    public abstract getMany(data: UpdateClientDto): Promise<Array<Client>>;
    public abstract getOneById(clientId: number): Promise<Client>;
}