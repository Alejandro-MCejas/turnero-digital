/**
 * @swagger
 * /doctor-schedules/doctor/{doctorId}:
 *   get:
 *     summary: Get doctor schedules by doctor ID (Admin only)
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor schedules retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /doctor-schedules/doctor/{doctorId}:
 *   post:
 *     summary: Create a new doctor schedule (Admin only)
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDoctorScheduleDto'
 *     responses:
 *       201:
 *         description: Doctor schedule created successfully
 *       400:
 *         description: Validation failed, invalid time range, or schedule overlap
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /doctor-schedules/{id}:
 *   put:
 *     summary: Update a doctor schedule (Admin only)
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDoctorScheduleDto'
 *     responses:
 *       200:
 *         description: Doctor schedule updated successfully
 *       400:
 *         description: Validation failed, invalid time range, or schedule overlap
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor schedule not found
 */

/**
 * @swagger
 * /doctor-schedules/{id}:
 *   delete:
 *     summary: Delete a doctor schedule (Admin only)
 *     tags:
 *       - Doctor Schedules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Doctor schedule deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor schedule not found
 */