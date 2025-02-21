import express, { json, urlencoded } from 'express'
import { subirarchivo } from './subir.js'
import { procesarFolder } from './processFolder.js'
import { borrarArchivo } from './borrarArchivo.js'
import { join,dirname } from 'node:path'
import { readFile } from 'node:fs'
import cors from 'cors'




const app = express()

app.disable('x-powered-by')
app.use(json({limit: '2048mb'}))
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(cors())


//Ruta default
app.get('/', (req, res) => {
    procesarFolder("", (folders, files, err) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        return res.status(200).json({ folders, files })
    })
})


//Ruta con parametro
app.get('/:pathRuta', (req, res) => {
    const { pathRuta } = req.params
    procesarFolder(pathRuta, (folders, files, err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        return res.status(200).json({ folders, files })
    })
})

app.get('/download/files/', (req, res) => {
    const { nombre } = req.query
    descargar('', nombre,res)

})

app.get('/download/files/:pathRuta', (req, res) => {
    const { pathRuta } = req.params
    const { nombre } = req.query
    console.log("Entro aca")
    descargar(pathRuta, nombre,res)
})
//Metodos post para subir achivos

app.post('/', (req, res) => {
    const { type, nombre, data } = req.body
    subirarchivo('', nombre, data, type)
    return res.status(201).send('Accion completada')
})

app.post('/:pathRuta', (req, res) => {
    const { pathRuta } = req.params
    const { type, nombre, data } = req.body
    subirarchivo(pathRuta, nombre, data, type)
    return res.status(201).send('Accion completada')
})


//Metodos para app.del

app.delete('/', (req, res) => {
    const { type, nombre } = req.query
    borrarArchivo('', type, nombre,(err)=>{
        if(err){
            return res.status(404).send('No se encontro el archivo')
        }else{
            return res.status(200).send('Archivo eliminado')
        }
    })
    
})

app.delete('/:pathRuta', (req, res) => {
    const { pathRuta } = req.params
    const { type, nombre } = req.query
    borrarArchivo(pathRuta, type, nombre,(err)=>{
        if(err){
            return res.status(404).send('No se encontro el archivo')
        }else{
            return res.status(200).send('Archivo eliminado')
        }
    })
})



const descargar = (strRuta, nombre,res) => {
    const pathdir = strRuta.split("-")
    const baseDir = dirname(new URL(import.meta.url).pathname).slice(1,)
    const folder = join(baseDir, 'SaveData', ...pathdir)
    readFile(join(folder, nombre),'base64', (err, data) => {
        if (err) {
            return res.status(404).send('No se encontro el archivo')
        }else{
            return res.status(200).json({name:nombre,data:data})
        }
    })
}


app.use((req, res) => {
    return res.json({ error: 'Not Found' }).status(404)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server corriendo en http://localhost:${PORT}`)
})