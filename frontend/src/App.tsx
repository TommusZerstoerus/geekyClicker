import {ClientContext} from './context/ClientContext.ts';
import Login from "./pages/Login.tsx";
import {useState} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./api/client.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Register from "./pages/Register.tsx";

function App() {

    const [client, setClient] = useState({
        username: '',
        password: '',
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ClientContext.Provider value={{client, setClient}}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login/>}></Route>
                        <Route path="home" element={<Home/>}></Route>
                        <Route path="register" element={<Register/>}></Route>
                    </Routes>
                </BrowserRouter>
            </ClientContext.Provider>
        </QueryClientProvider>
    )
}

export default App
