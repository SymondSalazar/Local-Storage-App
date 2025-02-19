import { useRef,useState } from "react"
import swal from "sweetalert"
export function Droper({ path }) {


    const [dragText, setDragText] = useState("Arrastra tus archivos")
    const fileInputRef = useRef(null)
    const dragover = (event) => {
        event.preventDefault()
        setDragText("Suelta los archivos")
    }

    const dragLeave = () => {
        setDragText("Arrastra tus Archivos")
    }

    const procesarArchivos = (files) => {

        let processedFiles = 0;
        files.forEach(elem => {

            const reader = new FileReader()

            reader.onload = function (evento) {
                const base64 = evento.target.result.split(",")[1]

                const nombre = elem.name

                let ruta
                if (!path) { ruta = import.meta.env.VITE_API_KEY }
                else { ruta = `${import.meta.env.VITE_API_KEY}/${path}` }

                fetch(ruta, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'file',
                        nombre: nombre,
                        data: base64
                    })
                }).then(response => {
                    if (!response.ok) throw new Error("Error subiendo")
                })
                    .catch(e => console.error(e))
                    .finally(() => {
                        processedFiles++
                        if (processedFiles == files.length) {
                            swal("Tus archivos han sido cargados")
                                .then(() => {
                                    window.location.reload()
                                })
                        }
                    })
            }
            reader.readAsDataURL(elem)

        })
    }
    const drop = (event) => {
        event.preventDefault()
        const files = Array.from(event.dataTransfer.files)
        procesarArchivos(files)
    }
    
    const manejarCambioArchivo = (event)=>{
        const files = Array.from(event.target.files)
        procesarArchivos(files)
    }
    const manejarClick = () => {
        fileInputRef.current.click()
    }

    return (
        <div onDrop={drop}
            onDragLeave={dragLeave}
            onDragOver={dragover}
            className='dropbox'
            onClick={manejarClick}>
            <button className="dropbutton">{dragText}
                <input type="file"
                    id="inputFile"
                    multiple
                    ref={fileInputRef}
                    onChange={manejarCambioArchivo}
                ></input>
                <span className="material-symbols-outlined mouse">
                    mouse
                </span>
            </button>
        </div>
    )
}