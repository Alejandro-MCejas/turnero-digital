import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";



@Entity({ name: "credential" })
export class Credential {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    password!: string

    @OneToOne(() => User, user => user.credential)
    @JoinColumn()
    user!: User

    @Column({ type: 'text', nullable: true })
    refreshToken?: string | null

    @Column({ type: 'text', nullable: true })
    resetToken?: string | null

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpires?: Date | null
}