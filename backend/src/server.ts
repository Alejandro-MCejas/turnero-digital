import express from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index'
import { errorHandler } from './middlewares/errorHandler'
import { swaggerSpec } from './config/swagger'
import cors from 'cors'
import { ENV } from './config/env'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
}))

app.use(express.json())

app.use(cookieParser())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(router)

app.use(errorHandler)


export default app