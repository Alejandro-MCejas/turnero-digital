import { IsNotEmpty, Length } from "class-validator";


export class CreateDoctorDto {

    @IsNotEmpty()
    @Length(2, 50)
    name!: string;

    @IsNotEmpty()
    @Length(2, 50)
    specialty!: string;

}