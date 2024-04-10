import {CircularProgress, Container, Typography} from "@mui/material";
import Header from "../components/Header.tsx";
import ClickUpgradeList from "../components/ClickUpgradeList.tsx";
import IncomeUpgradeList from "../components/IncomeUpgradeList.tsx";
import {useClient} from "../context/ClientContext.ts";
import {useQuery} from "@tanstack/react-query";
import {UpgradeService} from "../service/UpgradeService.ts";
import Box from "@mui/material/Box";
import icon from "../assets/icon.svg";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGame} from "../context/GameContext.ts";
import {Upgrade} from "../model/Upgrade.ts";

const Home = () => {
    const {client} = useClient();
    const [clickBonus, setClickBonus] = useState(0);
    const [incomeBonus, setIncomeBonus] = useState(0);
    const {game, setGame} = useGame()
    const navigate = useNavigate()

    useEffect(() => {
        if (!client || client.username == "" || client.password === "") {
            return navigate("/");
        }
        const interval = setInterval(() => updateBalance(), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const {data, isPending, isError, error, isSuccess} = useQuery(
        {
            queryKey: ["getUpgrades"],
            queryFn: async () => {
                return await UpgradeService.getUpgrades(client) as Upgrade[];
            },

        }
    );

    const handleClick = () => {
        setGame({...game, balance: game.balance + clickBonus});
    };

    useEffect(() => {
        if (isSuccess && data) {
            const savedUpgrades: Record<number, number> = {}
            savedUpgrades[0] = 1
            savedUpgrades[1] = 0
            savedUpgrades[2] = 0
            savedUpgrades[3] = 0
            savedUpgrades[4] = 0
            savedUpgrades[5] = 0
            savedUpgrades[6] = 0
            savedUpgrades[7] = 0
            savedUpgrades[8] = 0
            savedUpgrades[9] = 0

            data.forEach((upgrade) => {
                savedUpgrades[upgrade.upgradeID] = upgrade.level
            })
            setGame({
                balance: client.balance,
                upgrades: savedUpgrades
            })
        }
    }, [isSuccess, data]);

    useEffect(() => {
        const clickBonus = game.upgrades[0] + game.upgrades[1] * 2 + game.upgrades[2] * 3 + game.upgrades[3] * 4 + game.upgrades[4] * 5;
        setClickBonus(clickBonus);
        const incomeBonus = (game.upgrades[5] / 7) + (game.upgrades[6] / 5) + (game.upgrades[7] / 3) + (game.upgrades[8] / 2) + (game.upgrades[9]);
        setIncomeBonus(Math.floor(incomeBonus))
    }, [game.upgrades]);

    const updateBalance = () => {
        const newBalance = game.balance + incomeBonus;
        console.log("New balance:", newBalance, "Bonus:", incomeBonus)
        // setGame({...game, balance: game.balance + incomeBonus});
    }

    if (isPending) {
        return <Box sx={{justifyContent: "center", alignContent: "center"}}>
            <CircularProgress color="inherit"/>
        </Box>
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
                                <Typography variant="h4">Balance {game.balance}€</Typography>
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Klick Bonus {clickBonus}€
                                </Typography>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Passives Einkommen {incomeBonus}€
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