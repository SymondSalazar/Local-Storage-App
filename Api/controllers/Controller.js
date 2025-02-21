import { FileModel } from "../models/fileSystem.js"

export class ApiController {
    static controllerFolder(req, res) {

        const { pathRuta } = req.params
        const path = pathTemp(pathRuta)
        
        FileModel.procesarFolder(path, (folders, files, err) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            return res.status(200).json({ folders, files })
        })
    }

    static controllerSubirArchivo(req, res) {
        const { pathRuta } = req.params
        const { type, nombre, data } = req.body
        const path = pathTemp(pathRuta)
        FileModel.subirarchivo(path, nombre, data, type)
        return res.status(201).send('Accion completada')
    }

    static controllerBorrarArchivo(req, res)  {
        const { pathRuta } = req.params
        const { type, nombre } = req.query
        const path = pathTemp(pathRuta)

        FileModel.borrarArchivo(path, type, nombre, (err) => {
            if (err) {
                return res.status(404).send('No se encontro el archivo')
            } else {
                return res.status(200).send('Archivo eliminado')
            }
        })
    }

    static controllerDescargar(req, res) {
        const { pathRuta } = req.params
        const { nombre } = req.query
        const path = pathTemp(pathRuta)
        
        FileModel.descargar(path, nombre, (err,data)=>{
            if (err) {
                return res.status(404).send('Archivo no encontrado')
            } else {
                return res.status(200).json(data)
            }
        })
    }


}


//Funcion para obtener pathTemporales
function pathTemp(path){
    if (path) {
        return path
    }
    else {
        return ''
    }
}