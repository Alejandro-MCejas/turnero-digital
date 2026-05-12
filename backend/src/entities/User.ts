import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/UserRole";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";



@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    birthDate!: Date;

    @Column()
    nDni!: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments!: Appointment[]

    @OneToOne(() => Credential, credential => credential.user)
    credential!: Credential
}