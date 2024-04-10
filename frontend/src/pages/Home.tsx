import {CircularProgress, Container, Typography} from "@mui/material";
import Header from "../components/Header.tsx";
import ClickUpgradeList from "../components/ClickUpgradeList.tsx";
import IncomeUpgradeList from "../components/IncomeUpgradeList.tsx";
import {useClient} from "../context/ClientContext.ts";
import {UpgradeProvider, useUpgrade} from "../context/UpgradeContext.tsx";
import {useQuery} from "@tanstack/react-query";
import {UpgradeService} from "../service/UpgradeService.ts";
import {Upgrade} from "../model/Upgrade.ts";
import Box from "@mui/material/Box";
import icon from "../assets/icon.svg";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const {client, setClient} = useClient();
    const [clickBonus, setClickBonus] = useState(0);
    const [incomeBonus, setIncomeBonus] = useState(0);
    const { setUpgrade} = useUpgrade();
    const navigate = useNavigate()

    useEffect(() => {
        if (!client || client.username == "" || client.password === "") {
            return navigate("/");
        }
    }, []);

    const {data, isPending, isError, error, isSuccess} = useQuery(
        {
            queryKey: ["getUpgrades"],
            queryFn: async () => {
                return await UpgradeService.getUpgrades(client) as Upgrade;
            },

        }
    );

    const handleClick = () => {
        setClient({...client, balance: client.balance + clickBonus});
    };

    useEffect(() => {
        if (isSuccess && data) {
            const clickBonus = data.click1upgrade + data.click2upgrade * 2 + data.click3upgrade * 3 + data.click4upgrade * 4 + data.click5upgrade * 5;
            setClickBonus(clickBonus);
            const incomeBonus = (data.income1upgrade / 10) + (data.income2upgrade / 5) + (data.income3upgrade / 3) + (data.income4upgrade / 2) + (data.income5upgrade);
            setIncomeBonus(Math.floor(incomeBonus))
            setUpgrade(data);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        const interval = setInterval(() => updateBalance(), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateBalance = () => {
        console.log("Bonus:", incomeBonus)

        const newBalance = client.balance + incomeBonus;
        //console.log("New balance:", newBalance)
        //setClient({...client, balance: newBalance});
    }

    if (isPending) {
        return <>
            <CircularProgress color="inherit"/>
        </>
    }

    if (isError || !isSuccess) {
        return <>
            <Typography>Error: {error?.message}</Typography>
        </>
    }

    return (
        <>
            <Header/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Container maxWidth="xs"
                           style={{textAlign: "center", flex: "1", display: "flex", justifyContent: "center"}}>
                    <ClickUpgradeList/>
                </Container>
                <Container maxWidth="xs"
                           style={{textAlign: "center", flex: "1", display: "flex", justifyContent: "center"}}>
                    <Container maxWidth="xs" style={{maxHeight: '1000px', overflowY: 'auto', textAlign: 'center'}}>
                        <Box p={2}>
                            <div style={{marginBottom: '20px'}}>
                                <Typography variant="h4">Balance: {client.balance}€</Typography>
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Klick Bonus: {clickBonus}€
                                </Typography>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Passives Einkommen: {incomeBonus}€
                                </Typography>
                            </div>
                            <div>
                                <img
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    src={icon}
                                    alt="Logo"
                                ></img>
                            </div>
                        </Box>
                    </Container>
                </Container>
                <Container maxWidth="xs"
                           style={{textAlign: "center", flex: "1", display: "flex", justifyContent: "center"}}>
                    <IncomeUpgradeList/>
                </Container>
            </div>
        </>
    );
};

export default Home;