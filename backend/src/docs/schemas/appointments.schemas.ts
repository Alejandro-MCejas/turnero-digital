export const appointmentsSchemas = {
    CreateAppointmentDto: {
        type: "object",
        required: ["date", "time", "doctorId"],
        properties: {
            date: {
                type: "string",
                format: "date",
                example: "2023-01-01"
            },
            time: {
                type: "string",
                example: "10:00"
            },
            doctorId: {
                type: "string",
                format: "uuid"
            },
            userId: {
                type: "string",
                format: "uuid"
            },
        }
    },

    UpdateAppointmentDto: {
        type: "object",
        properties: {
            date: {
                type: "string",
                format: "date",
                example: "2023-01-01"
            },
            time: {
                type: "string",
                example: "10:00"
            },
            status: {
                type: "string",
                enum: ["pending", "confirmed", "cancelled"],
            }
        }
    },
}