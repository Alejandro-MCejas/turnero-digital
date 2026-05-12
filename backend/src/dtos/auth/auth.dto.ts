import { IsDateString, IsEmail, IsNotEmpty, Length } from "class-validator";


export class RegisterDto {

    @IsNotEmpty()
    @Length(2, 50)
    name!: string;

    @IsEmail()
    email!: string;

    @Length(6, 20)
    password!: string;

    @Length(6, 20)
    confirmPassword!: string;

    @IsDateString()
    birthdate!: Date;

    @IsNotEmpty()
    @Length(6, 20)
    nDni!: string
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
}