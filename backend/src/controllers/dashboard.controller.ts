import { Request, Response } from "express";
import { dashboardStats as dashboardStatsService } from "../services/dashboard.service";


export const dashboardStats = async (req: Request, res: Response) => {
    return res.status(200).json(await dashboardStatsService(req.user!.id, req.user!.role))
}