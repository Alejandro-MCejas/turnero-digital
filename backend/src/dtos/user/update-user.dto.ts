import { IsDateString, IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

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
}