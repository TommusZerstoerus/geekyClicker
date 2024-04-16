import {ClientContext} from './context/ClientContext.ts';
import Login from "./pages/Login.tsx";
import {useState} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./api/client.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Register from "./pages/Register.tsx";
import {GameContext} from "./context/GameContext.ts";
import {theme} from "./themes/theme.ts";
import {ThemeProvider} from "@mui/material";
import './App.css';

function App() {

    const [client, setClient] = useState({
        username: '',
        password: '',
        balance: 0,
        unlockedStocks: false
    });

    const [game, setGame] = useState({
        balance: 0,
        upgrades: {},
        unlockedStocks: false
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <ClientContext.Provider value={{client, setClient}}>
                        <GameContext.Provider value={{game, setGame}}>
                            <BrowserRouter>
                                <Routes>
                                    <Route index element={<Login/>}></Route>
                                    <Route path="home" element={<Home/>}></Route>
                                    <Route path="register" element={<Register/>}></Route>
                                </Routes>
                            </BrowserRouter>
                        </GameContext.Provider>
                    </ClientContext.Provider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
