import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @MinLength(10)
    @MaxLength(120)
    fullName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;
}
