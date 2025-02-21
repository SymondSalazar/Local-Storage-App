import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { rootRouter } from './routes/root.js'
import { downloadRouter } from './routes/download.js'

const app = express()

app.use(json({limit: '2048mb'}))
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.disable('x-powered-by')

//Rutas 
app.use('/',rootRouter)
app.use('/download/files',downloadRouter)


app.use((req, res) => {
    return res.json({ error: 'Not Found' }).status(404)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`)
})


