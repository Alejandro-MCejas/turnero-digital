import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { DoctorScheduleDay } from "../enums/DoctorScheduleDay";


@Entity({ name: "doctor_schedule" })
export class DoctorSchedule {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "enum", enum: DoctorScheduleDay })
    dayOfWeek!: DoctorScheduleDay

    @Column()
    startTime!: string

    @Column()
    endTime!: string

    @ManyToOne(() => Doctor, doctor => doctor.schedules, { onDelete: "CASCADE" })
    doctor!: Doctor
}