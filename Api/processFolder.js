const path = require('node:path')
const fs = require('node:fs')
const procesarFolder = (strRuta,callback) => {

    const pathdir = strRuta.split("-")
    const folder = path.join(__dirname, 'SaveData', ...pathdir)
    
    fs.readdir(folder, (err, files) => {
        if (err){
            err.message = "No se encontro el directorio"
            return callback([],[],err)
        }
        
        let folders = []
        let filesArray = [] 

        let pending = files.length
 
        files.forEach(file => {
            if(fs.lstatSync(path.join(folder, file)).isDirectory()){
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

module.exports = {procesarFolder}