import { FileMockup } from './filesMockup.jsx';
import { FolderMockup } from './FolderMockup.jsx';
import { useEffect, useState } from 'react';
import { Droper } from './droper.jsx';
import { CreateFolder } from './createFolder.jsx';
import { useNavigate } from 'react-router-dom';
import { Cameback } from './cameback.jsx';
import { VITE_API_KEY } from '../const/const.js';

export function LoadedItems({ ruta }) {
    const navigate = useNavigate()
    const [folders, setFolder] = useState([])
    const [archivos, setArchivos] = useState([])

    useEffect(() => {
        let path
        if (!ruta) { path = VITE_API_KEY }
        else { path = `${VITE_API_KEY}/${ruta}` }
        fetch(path)
            .then(res => res.json())
            .then(response => {

                const files = response.files
                const folder = response.folders
                setArchivos(files)
                setFolder(folder)
                if(!files && !folder){
                    navigate('/404/notfound')
                }
            })

    }, [ruta])
    return (
        <>
            <Droper path={ruta} />
            <CreateFolder path={ruta} />
            <Cameback path = {ruta}/>
            {
        
                folders.map(elem => {
                    return (<FolderMockup path={ruta} key={elem} name={elem} />)
                })
            }
            {
                archivos.map(elem => {
                    return (<FileMockup key={elem} path={ruta} name={elem} />)
                })
            }
        </>
    )
}