export const userSchemas = {
    UpdateUserRoleDto: {
        type: "object",
        required: ["role"],
        properties: {
            role: { type: "string", enum: ["user", "admin"] }
        }
    },

    UpdateUserDto: {
        type: "object",
        properties: {
            name: {
                type: "string"
            },
            email: {
                type: "string",
                format: "email"
            },
            birthDate: {
                type: "string",
                format: "date"
            },
            nDni: {
                type: "string"
            },
            role: {
                type: "string",
                enum: ["user", "admin"]
            }
        }
    }
}