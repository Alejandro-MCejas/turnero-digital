import express from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index'
import { errorHandler } from './middlewares/errorHandler'
import { swaggerSpec } from './config/swagger'

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(router)

app.use(errorHandler)


export default app