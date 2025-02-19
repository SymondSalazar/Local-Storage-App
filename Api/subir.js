const path = require('node:path')
const fs = require('node:fs')

const subirarchivo = (strRuta,name,data,type)=>{
    const pathdir = strRuta.split("-")
    const folder = path.join(__dirname, 'SaveData', ...pathdir)
    const buffer = Buffer.from(data, 'base64')

    if(type === 'folder'){
        fs.mkdir(path.join(folder,name), (err) => {
            if (err) console.error(err)
            console.log('Directorio creado')
        })
        return
    }

    
    if(!fs.existsSync(folder)) return console.error('Directorio no encontrado')

    fs.writeFile(path.join(folder,name), buffer, (err) => {    
        if (err) console.error(err)
        console.log('Archivo guardado')
    })

}

module.exports= {subirarchivo}
