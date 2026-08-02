/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags:
 *       - Doctors
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 */

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags:
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /doctors/{id}/available-days:
 *   get:
 *     summary: Get available days for a doctor
 *     tags:
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Available days retrieved successfully
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /doctors/{id}/availability:
 *   get:
 *     summary: Get availability for a doctor
 *     tags:
 *       - Doctors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: "2023-01-01"
 *     responses:
 *       200:
 *         description: Available time slots retrieved successfully
 *       400:
 *         description: Date is required or format is invalid (YYYY-MM-DD)
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor (Admin only)
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDoctorDto'
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update a doctor (Admin only)
 *     tags:
 *       - Doctors
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
 *             $ref: '#/components/schemas/UpdateDoctorDto'
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 * 
 */

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor (Admin only)
 *     tags:
 *       - Doctors
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
 *         description: Doctor deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */