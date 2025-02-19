import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';
import { NotFound } from './elems/notFound';

export function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<Layout/>}></Route>
                <Route path='/:carpeta' element = {<Layout/>}></Route>
                <Route path='/404/notfound' element={<NotFound/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    );
}