import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import './style.scss';

function App() {

    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
        if (!currentUser) {
            return <Navigate to="superchat-2.0/login" />
        }else return children
    }

    console.log('current user:');
    console.log(currentUser);

    return (
        <BrowserRouter basename="/superchat-2.0">
            <Routes>
                <Route path="/superchat-2.0/">
                    <Route index element={ <ProtectedRoute><Home/></ProtectedRoute> } />
                    <Route path="superchat-2.0/register" element={<Register/>} />
                    <Route path="superchat-2.0/login" element={<Login/>} />
                </Route>
            </Routes>

        
        </BrowserRouter>
    );
}

export default App;

