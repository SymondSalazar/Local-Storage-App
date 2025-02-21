import { useState } from "react"
import { VITE_API_KEY } from "../const/const.js"


export function CreateFolder({path}) {
    let mostrar = '/Inicial'
    if(path){
        mostrar = mostrar + '/' + path.split('-').join('/')
    }


    const[folderName,setFolderName] = useState('')
    const manejarSubmit = (e)=>{
        let ruta
        if(!path){ruta = VITE_API_KEY}
        else{ruta = `${VITE_API_KEY}/${path}`}
        e.preventDefault()
        fetch(ruta, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'folder',
                nombre: folderName,
                data: ""
            })
        })
        
        window.location.reload()
    }
    const manejarChange = (e)=>{
        setFolderName(e.target.value)
    }
    return (
        <>
        <form onSubmit={manejarSubmit} className="form">
            <input onChange={manejarChange} placeholder="Nombre de la carpeta" type="text" className="inputTexto" pattern="^[a-zA-Z0-9]+$" required/>
            <input  type="submit" className="createFolder" value={`Crear carpeta en ${mostrar}`}/>
        </form>
        </>
    )
    

}