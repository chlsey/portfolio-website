import { HashRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import './App.css'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="*" element={<AppLayout />} />
            </Routes>
        </HashRouter>
    )
}

export default App
