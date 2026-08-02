import swaggerJsdoc from 'swagger-jsdoc';
import { appointmentsSchemas, authSchemas, doctorSchedulesSchemas, doctorSchemas, userSchemas } from '../docs/schemas';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Turnero Digital API",
            version: "1.0.0",
            description: "REST API for managing doctors, schedules, appointments and user authentication."
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT ?? 3000}`,
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {
                ...authSchemas,
                ...appointmentsSchemas,
                ...doctorSchemas,
                ...doctorSchedulesSchemas,
                ...userSchemas
            }
        }
    },
    apis: ["./src/docs/*.ts"]
}

export const swaggerSpec = swaggerJsdoc(options);