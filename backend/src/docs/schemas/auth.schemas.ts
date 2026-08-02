export const authSchemas = {
    LoginDto: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
                format: "email",
                example: "juan@gmail.com"
            },
            password: {
                type: "string",
                example: "123456"
            }
        }
    },

    RefreshTokenDto: {
        type: "object",
        required: ["refreshToken"],
        properties: {
            refreshToken: {
                type: "string",
            }
        }
    },

    RegisterDto: {
        type: "object",
        required: ["name", "email", "password", "confirmPassword", "birthDate", "nDni"],
        properties: {
            name: {
                type: "string",
                example: "Juan Perez"
            },
            email: {
                type: "string",
                format: "email",
                example: "juan@gmail.com"
            },
            password: {
                type: "string",
                example: "123456"
            },
            confirmPassword: {
                type: "string",
                example: "123456"
            },
            birthDate: {
                type: "string",
                format: "date",
                example: "1990-01-01"
            },
            nDni: {
                type: "string",
                example: "12345678"
            }
        }
    },

    ForgotPasswordDto: {
        type: "object",
        required: ["email"],
        properties: {
            email: {
                type: "string",
                format: "email",
                example: "juan@gmail.com"
            }
        }
    },

    ResetPasswordDto: {
        type: "object",
        required: ["token", "password", "confirmPassword"],
        properties: {
            token: {
                type: "string",
                example: "a1b2c3d4e5f6..."
            },
            password: {
                type: "string",
                example: "123456"
            },
            confirmPassword: {
                type: "string",
                example: "123456"
            }
        }
    }
}