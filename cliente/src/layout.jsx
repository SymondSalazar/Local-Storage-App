import { LoadedItems } from "./elems/loadedItems"
import { useParams } from "react-router-dom"
export function Layout() {
    const { carpeta } = useParams()


    return (
        <article className='files'>
            
            <h1>Nube Casera</h1>
  
            <LoadedItems ruta={carpeta} />

        </article>
    )
}