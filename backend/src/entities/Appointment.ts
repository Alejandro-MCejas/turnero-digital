import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentStatus } from "../enums/AppointmentStatus";
import { User } from "./User";
import { Doctor } from "./Doctor";


@Index("IDX_appointments_date_time_doctor_active",
    ["date", "time", "doctor"],
    {
        unique: true,
        where: `"status" <> 'cancelled'`
    }
)
@Entity({ name: "appointments" })
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    date!: Date;

    @Column()
    time!: string;

    @Column({ type: "enum", enum: AppointmentStatus, default: AppointmentStatus.PENDING })
    status!: AppointmentStatus;

    @ManyToOne(() => User, user => user.appointments)
    user!: User;

    @ManyToOne(() => Doctor, doctor => doctor.appointments)
    doctor!: Doctor;
}