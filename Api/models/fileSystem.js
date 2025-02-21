import { join} from 'node:path'
import { mkdir,readFile, existsSync, readdir, lstatSync,rm,unlink,writeFile } from 'node:fs'
import { SAVE_DIR } from '../const.js'



export class FileModel {
    static subirarchivo(strRuta, name, data, type) {

        const pathdir = strRuta.split("-")
        const folder = join(SAVE_DIR, ...pathdir)
        const buffer = Buffer.from(data, 'base64')

        if (type === 'folder') {
            mkdir(join(folder, name), (err) => {
                if (err) console.error(err)
                console.log('Directorio creado')
            })
            return
        }

        if (!existsSync(folder)) return console.error('Directorio no encontrado')

        writeFile(join(folder, name), buffer, (err) => {
            if (err) console.error(err)
            console.log('Archivo guardado')
        })
    }

    static procesarFolder (strRuta, callback)  {
        const pathdir = strRuta.split("-")
        const folder = join(SAVE_DIR, ...pathdir)

        readdir(folder, (err, files) => {
            if (err) {
                err.message = "No se encontro el directorio"
                return callback([], [], err)
            }
            
            let folders = []
            let filesArray = []
            let pending = files.length

            files.forEach(file => {
                if (lstatSync(join(folder, file)).isDirectory()) {
                    folders.push(file)
                } else {
                    filesArray.push(file)
                }
                pending--
                if (pending === 0) {
                    return callback(folders, filesArray, null)
                }
            })
            if (folders.length + filesArray.length == 0) {
                return callback(folders, filesArray, null)
            }
        })
    }

    static borrarArchivo (strRuta, type, nombre, callback)  {
        const pathdir = strRuta.split("-")
        const folder = join(SAVE_DIR, ...pathdir)
        if (type === 'folder') {
            rm(join(folder, nombre), { recursive: true }, (err) => {
                if (err) {
                    console.error("No se encontro el directorio")
                    return callback(err)
                }
                console.log('Directorio eliminado')
                return callback(null)
            })
        }
    
        else {
            unlink(join(folder, nombre), (err) => {
                if (err) {

                    console.error("No se encontro el archivo")
                    return callback(err)
                }
    
                console.log('Archivo eliminado')
                return callback(null)
            })
        }
    }

    static descargar  (strRuta, nombre,callback) {
        const pathdir = strRuta.split("-")
        const folder = join(SAVE_DIR,  ...pathdir)

        readFile(join(folder, nombre),'base64', (err, data) => {
            if (err) {
                callback(err,null)
            }else{
                return callback(null,{name:nombre,data:data})
            }
        })
    }
}