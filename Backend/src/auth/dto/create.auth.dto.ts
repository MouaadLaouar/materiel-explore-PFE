import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsString()
    @IsNotEmpty()
    Password: string
}
