import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { VITE_API_KEY } from "../const/const.js"

export function FolderMockup({ path, name }) {
    const navigate = useNavigate()
    
    const entrarFolder = () => {
        if (path) {
            const ruta = "/" + path + "-" + name
            navigate(ruta)
            window.location.reload()
        } else {
            const ruta = "/" + name
            navigate(ruta)
            window.location.reload()
        }
    }

    const handleClick = () =>{
        swal({
            title: '¿Estas seguro?',
            text : 'Una vez borrada la carpeta no podras recuperar los archivos',
            icon: 'warning',
            buttons: true,
            dangerMode:true,
        }).then((willDelete) =>{
            if(willDelete){
                let request
                if (path){
                    request = `${VITE_API_KEY}/${path}?type=folder&nombre=${name}`
                }else{
                    request = `${VITE_API_KEY}/?type=folder&nombre=${name}`
                }
                console.log(request)
                fetch(request,{
                    method: 'DELETE'
                }).then(response =>{
                    if(!response.ok) throw new Error("Error al eliminar un archivo")
                    
                }).catch(err=>console.error(err))
                .finally(()=>{
                    swal('Tus archivos fueron eliminados')
                    .then(()=>window.location.reload())
                }
                )
            }else{
                swal('Tus archivos no fuero eliminados')
            }
        })
        
       
    
    }


    return (
        <article className='sm-folder-cards' >
            <header onClick={entrarFolder} className='sm-folder-cards-header'>
                <span className="material-symbols-outlined folder">
                    folder
                </span>
            </header>

            <div onClick={entrarFolder} className='sm-folder-cards-div'>
                <strong>{name}</strong>
                <header className='sm-folder-cards-header'>
                </header>
            </div>
            <footer className='sm-folder-cards-footer'>
                <button onClick={handleClick}className='sm-folder-cards-button'>
                    <span className="material-symbols-outlined delete">
                        delete
                    </span>
                </button>
            </footer>
        </article>
    );
}