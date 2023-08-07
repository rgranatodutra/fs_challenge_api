import { Client } from "../entities/client.entity";

export class DeleteClientResponse {
    isDeleted: boolean;
    deletedClient?: Client;
}