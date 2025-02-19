import { useNavigate } from "react-router-dom"
export function Cameback({path}){
    const navigate = useNavigate()
    if(path){
        let ruta
        const arrayPath = path.split('-')
        ruta = '/'       
        if(arrayPath.length > 1){ruta = ruta + arrayPath.slice(0,arrayPath.length - 1).join('-')}
        console.log(ruta)
        return(
            <button onClick={()=>{
                navigate(ruta)
                console.log(ruta)
                window.location.reload()
            }} className="buttonBack">
                Atras
            </button>
        )
    }


}