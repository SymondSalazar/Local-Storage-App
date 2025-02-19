import swal from "sweetalert"
export function FileMockup({ path, name }) {


    const handleClick = () => {
        swal({
            title: 'Estas seguro?',
            text: 'Una vez borrado no podras recuperar el archivo',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelte) => {
            if (willDelte) {
                let request
                if (path) {
                    request = `${import.meta.env.VITE_API_KEY}/${path}?type=file&nombre=${name}`
                } else {
                    request = `${import.meta.env.VITE_API_KEY}/?type=file&nombre=${name}`
                }
                console.log(request)
                fetch(request, {
                    method: 'DELETE'
                }).then(response => {
                    if (!response.ok) throw new Error("Error al eliminar un archivo")

                }).catch(err => console.error(err))
                    .finally(() => {
                        swal('Tu archivo fue eliminado')
                            .then(() => window.location.reload())

                    }
                    )
            } else {
                swal('Tus archivos no fueron eliminados')
            }
        })



    }
    const manejarDescarga = ()=>{
        let request
        if(path){
            request = `${import.meta.env.VITE_API_KEY}/download/files/${path}?nombre=${name}`
        }else{
            request = `${import.meta.env.VITE_API_KEY}/download/files/?nombre=${name}`
        }

        fetch(request)
            .then(response => response.json())
                .then(datos => {
                    const {name,data} = datos;
                    const byteCharacters = atob(data)
                    const byteArrays = []

                    //Convertir los bytes a un array de tipo Uint8Arry
                    for(let offset = 0; offset<byteCharacters.length;offset+=1024){
                        const slice = byteCharacters.slice(offset,offset+1024);
                        const byteNumbers = new Array(slice.length)
                        for(let i = 0; i<slice.length; i++){
                            byteNumbers[i]=slice.charCodeAt(i)
                        }
                        byteArrays.push(new Uint8Array(byteNumbers))
                    }
                    const blob = new Blob(byteArrays,{type: 'application/octet-stream'})
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = name
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    window.URL.revokeObjectURL(url)
                }).catch(err =>{
                    console.error('Error al descargar el archivo')
                })

    }
    return (
        <article className='sm-files-cards'>
            <header className='sm-files-cards-header'>
                <span className="material-symbols-outlined archivo">
                    files
                </span>
            </header>

            <div className='sm-files-cards-div'>
                <strong>{name}</strong>
            </div>
            <footer className='sm-files-cards-footer'>
                <button onClick={manejarDescarga} className='sm-files-cards-button'>
                    <span className="material-symbols-outlined download">
                        download
                    </span>

                </button>
                <button onClick={handleClick} className='sm-files-cards-button'>
                    <span className="material-symbols-outlined delete">
                        delete
                    </span>
                </button>
            </footer>
        </article>
    );
}