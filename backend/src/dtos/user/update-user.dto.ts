import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { UserRole } from "../../enums/UserRole";

export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @Length(2, 50)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsDateString()
    birthDate?: Date;

    @IsOptional()
    @IsNotEmpty()
    @Length(6, 20)
    nDni?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}