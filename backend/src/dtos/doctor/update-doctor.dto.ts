import { IsNotEmpty, IsOptional, Length } from "class-validator";


export class UpdateDoctorDto {

    @IsOptional()
    @IsNotEmpty()
    @Length(2, 50)
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(2, 50)
    specialty?: string;
}