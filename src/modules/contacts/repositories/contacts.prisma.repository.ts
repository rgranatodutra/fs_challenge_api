import { Injectable } from "@nestjs/common";
import { ContactsRepository } from "./contacts.abstract.repository";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { Contact } from "../entities/contact.entity";
import { PrismaService } from "src/database/prisma.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
    constructor(
        private database: PrismaService,
    ) { }

    public async create(clientId: number, data: CreateContactDto): Promise<Contact> {
        const newContact = await this.database.contact.create({ data: { ...data, clientId } });

        return plainToInstance(Contact, newContact);
    }

    public async update(id: number, data: UpdateContactDto): Promise<Contact> {
        const updatedContact = await this.database.contact.update({
            where: { id }, data: { ...data, updatedAt: new Date() }
        });

        return plainToInstance(Contact, updatedContact);
    }

    public async delete(id: number): Promise<void> {
        await this.database.contact.delete({
            where: { id }
        });
    }

    public async displayAllByClient(clientId: number): Promise<Array<Contact>> {
        const findContacts = await this.database.contact.findMany({
            where: { clientId }
        });

        return plainToInstance(Contact, findContacts);
    }

    public async getMany(data: UpdateContactDto): Promise<Array<Contact>> {
        const findContacts = await this.database.contact.findMany({
            where: { ...data }
        });

        return plainToInstance(Contact, findContacts);
    }

    public async getOneById(id: number): Promise<Contact> {
        const findContact = await this.database.contact.findUnique({
            where: { id }
        });

        return plainToInstance(Contact, findContact);
    }
}