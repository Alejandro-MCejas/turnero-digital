/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments (Admin only)
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /appointments/me:
 *   get:
 *     summary: Get my appointments
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My appointments retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID (Admin only)
 *     tags:
 *       - Appointments
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
 *       200:
 *         description: Appointment retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create an appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAppointmentDto'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400: 
 *         description: Validation failed or appointment cannot be created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or doctor not found
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags:
 *       - Appointments
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
 *             $ref: '#/components/schemas/UpdateAppointmentDto'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Validation failed or appointment cannot be modified
 *       401:
 *         description: Unauthorized
 *       403:   
 *         description: Forbidden
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Appointment cancelled successfully
 *     tags:
 *       - Appointments
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
 *         description: Appointment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Appointment not found
 */