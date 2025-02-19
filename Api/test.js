const fs = require('node:fs')
let datos
fs.readFile('./SaveData/folderPrueba/images.jpeg','base64', (err, data) => {
    if (err) console.error(err)
    console.log(data)
})



