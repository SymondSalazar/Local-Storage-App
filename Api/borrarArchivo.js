const path = require('node:path')
const fs = require('node:fs')

const borrarArchivo = (strRuta, type, nombre,callback) => {
    const pathdir = strRuta.split("-")
    const folder = path.join(__dirname, 'SaveData', ...pathdir)

    if (type === 'folder') {

        fs.rm(path.join(folder, nombre), { recursive: true }, (err) => {
            if (err) {
                console.error("No se encontro el directorio")
                return callback(err)
            }
            console.log('Directorio eliminado')
            return callback(null)
        })
    } 
    
    else {
        fs.unlink(path.join(folder, nombre), (err) => {
            if (err) {
                console.error("No se encontro el archivo")
                return callback(err)
            } 
            
            console.log('Archivo eliminado')
            return callback(null)
        })
    }
}
module.exports= {borrarArchivo}