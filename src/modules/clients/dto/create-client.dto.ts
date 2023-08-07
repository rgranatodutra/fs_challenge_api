import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @MinLength(10)
    @MaxLength(30)
    fullName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phone: string;
}
