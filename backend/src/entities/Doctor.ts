import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { DoctorSchedule } from "./DoctorSchedule";



@Entity({ name: "doctor" })
export class Doctor {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    specialty!: string

    @OneToMany(() => Appointment, appointment => appointment.doctor)
    appointments!: Appointment[]

    @OneToMany(() => DoctorSchedule, schedule => schedule.doctor)
    schedules!: DoctorSchedule[]
}