import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mainRouter from './routes'

const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', mainRouter)

app.listen(PORT, () => console.log(`Server running on port: ${ PORT }`))