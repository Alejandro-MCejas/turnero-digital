
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
    birthDate!: Date;

    @IsNotEmpty()
    @Length(6, 20)
    nDni!: string
}

