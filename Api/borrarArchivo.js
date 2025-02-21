import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { join,dirname } from 'node:path'


export const borrarArchivo = (strRuta, type, nombre,callback) => {
    const pathdir = strRuta.split("-")
    const baseDir = dirname(new URL(import.meta.url).pathname).slice(1,)
    const folder = join(baseDir,'SaveData', ...pathdir)

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
