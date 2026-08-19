/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics (Admin only)
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   
 */