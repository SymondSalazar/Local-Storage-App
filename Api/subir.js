import { join,dirname } from 'node:path'
import { mkdir, existsSync, writeFile } from 'node:fs'

export const subirarchivo = (strRuta,name,data,type)=>{
    const pathdir = strRuta.split("-")
   const baseDir = dirname(new URL(import.meta.url).pathname).slice(1,)
    const folder = join(baseDir,'SaveData', ...pathdir)
    const buffer = Buffer.from(data, 'base64')

    if(type === 'folder'){
        mkdir(join(folder,name), (err) => {
            if (err) console.error(err)
            console.log('Directorio creado')
        })
        return
    }

    
    if(!existsSync(folder)) return console.error('Directorio no encontrado')

    writeFile(join(folder,name), buffer, (err) => {    
        if (err) console.error(err)
        console.log('Archivo guardado')
    })

}

