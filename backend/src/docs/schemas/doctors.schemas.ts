export const doctorSchemas = {
    CreateDoctorDto: {
        type: "object",
        required: ["name", "specialty"],
        properties: {
            name: {
                type: "string",
                example: "Juan Perez"
            },
            specialty: {
                type: "string",
                example: "Cardiologia"
            }
        }
    },

    UpdateDoctorDto: {
        type: "object",
        properties: {
            name: {
                type: "string",
                example: "Juan Perez"
            },
            specialty: {
                type: "string",
                example: "Cardiologia"
            }
        }
    },
}