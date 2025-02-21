import { join,dirname } from 'node:path'

import { readdir, lstatSync } from 'node:fs'


export const procesarFolder = (strRuta,callback) => {
 
    const pathdir = strRuta.split("-")
    const baseDir = dirname(new URL(import.meta.url).pathname).slice(1,)
    
    const folder = join(baseDir,'SaveData', ...pathdir)
    
    readdir(folder, (err, files) => {
        if (err){
            
            err.message = "No se encontro el directorio"
            return callback([],[],err)

        }
        
        let folders = []
        let filesArray = [] 

        let pending = files.length
 
        files.forEach(file => {
            if(lstatSync(join(folder, file)).isDirectory()){
                folders.push(file)
            }else{
                filesArray.push(file)
            }        
            pending--
            if(pending === 0){
                return callback(folders, filesArray,null)
            }
        })

        if (folders.length + filesArray.length == 0){
            return callback(folders,filesArray,null)
        }
    
    })
    
}

