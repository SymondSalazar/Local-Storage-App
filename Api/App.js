const express = require('express')
const { subirarchivo } = require('./subir')
const { procesarFolder } = require('./processFolder')
const { borrarArchivo } = require('./borrarArchivo')
const path = require('path')
const fs = require('fs')
const app = express()
const cors = require('cors')

const port = process.env.PORT ?? 3000

app.disable('x-powered-by')

app.use(express.json({limit: '2048mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())
//Ruta default
app.get('/', (req, res) => {
    
    res.header('')
    procesarFolder("", (folders, files, err) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        res.json({ folders, files })
        return res.status(200)
    })
})

//Ruta con parametro
app.get('/:pathRuta', (req, res) => {
    const { pathRuta } = req.params
    procesarFolder(pathRuta, (folders, files, err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json({ folders, files })
        return res.status(200)
    })
})

app.get('/download/files/', (req, res) => {
    const { nombre } = req.query
   // console.log(nombre)
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
    const folder = path.join(__dirname, 'SaveData', ...pathdir)
    fs.readFile(path.join(folder, nombre),'base64', (err, data) => {
        if (err) {
            res.status(404).send('No se encontro el archivo')
        }else{
            res.status(200).json({name:nombre,data:data})
        }
    })
}


app.use((req, res) => {
    return res.json({ error: 'Not Found' }).status(404)
})


app.listen(port,'0.0.0.0', () => {
    console.log(`Server corriendo en http://localhost:${port}`)
})