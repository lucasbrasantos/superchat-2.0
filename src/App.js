import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './style.scss';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home/>}/>
                    <Route path="register" element={<Register/>} />
                    <Route path="login" element={<Login/>} />
                </Route>
            </Routes>

        
        </BrowserRouter>
    );
}

export default App;

