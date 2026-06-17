import { IsEnum } from "class-validator";
import { UserRole } from "../../enums/UserRole";


export class UpdateUserRoleDto {

    @IsEnum(UserRole)
    role!: UserRole;
    
}