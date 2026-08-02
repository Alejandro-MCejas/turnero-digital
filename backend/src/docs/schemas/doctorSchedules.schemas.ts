export const doctorSchedulesSchemas = {
    CreateDoctorScheduleDto: {
        type: "object",
        required: ["dayOfWeek", "startTime", "endTime"],
        properties: {
            dayOfWeek: {
                type: "integer",
                enum: [0, 1, 2, 3, 4, 5, 6]
            },
            startTime: {
                type: "string",
                example: "10:00"
            },
            endTime: {
                type: "string",
                example: "11:00"
            }
        }
    },

    UpdateDoctorScheduleDto: {
        type: "object",
        properties: {
            dayOfWeek: {
                type: "integer",
                enum: [0, 1, 2, 3, 4, 5, 6]
            },
            startTime: {
                type: "string",
                example: "10:00"
            },
            endTime: {
                type: "string",
                example: "11:00"
            }
        }
    }
}