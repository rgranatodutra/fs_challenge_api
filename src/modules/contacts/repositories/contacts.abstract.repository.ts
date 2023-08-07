import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { Contact } from "../entities/contact.entity";

export abstract class ContactsRepository {
    public abstract create(clientId: number, data: CreateContactDto): Promise<Contact>;
    public abstract update(contactId: number, data: UpdateContactDto): Promise<Contact>;
    public abstract delete(contactId: number): Promise<void>;
    public abstract displayAllByClient(clientId: number): Promise<Array<Contact>>;
    public abstract getMany(data: UpdateContactDto): Promise<Array<Contact>>;
    public abstract getOneById(contactId: number): Promise<Contact>;
}