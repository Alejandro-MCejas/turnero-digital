import { IsDateString, IsEmail, IsNotEmpty, Length } from "class-validator";
import { UserRole } from "../../enums/UserRole";


export class CreateUserDto {

    @IsNotEmpty()
    @Length(2, 50)
    name!: string;

    @IsEmail()
    email!: string;

    @IsDateString()
    birthdate!: Date;

    @IsNotEmpty()
    @Length(6, 20)
    nDni!: string;

    role?: UserRole
}