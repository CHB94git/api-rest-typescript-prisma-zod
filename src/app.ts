import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { errorHandler } from './middlewares/error-handler'
import mainRouter from './routes'

const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', mainRouter)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port: ${ PORT }`))