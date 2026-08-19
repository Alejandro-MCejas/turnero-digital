import { Appointment } from "./appointment";

export interface DashboardStats {
    totals: {
        users: number;
        doctors: number;
        appointments: number;
    };

    byStatus: {
        confirmed: number;
        pending: number;
        cancelled: number;
        completed: number;
    };

    byDay: {
        date: string;
        count: number;
    }[];

    today: Appointment[];

    todayPreview: Appointment[];

    upcoming: Appointment[];
}