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
import BalanceComponent, {formatNumber} from "../components/BalanceComponent.tsx";
import {UpgradeBonusList, UpgradeMileStoneList} from "../model/UpgradeList.ts";
import { useSpring, animated } from '@react-spring/web'

const Home = () => {
    const {client} = useClient();
    const [clickBonus, setClickBonus] = useState(0);
    const [incomeBonus, setIncomeBonus] = useState(0);
    const [wobble, setWobble] = useState(false)
    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }))
    const {game, setGame} = useGame()
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
                return await UpgradeService.getUpgrades(client) as Upgrade[];
            },

        }
    );

    const handleClick = () => {
        if (!wobble) {
            setWobble(true);
        }
        setGame({...game, balance: game.balance + clickBonus});
    };

    function calcBonus(id: number) {
        const mileStones = Math.floor(game.upgrades[id] / 100)
        return Math.floor(game.upgrades[id] * UpgradeBonusList[id] + UpgradeMileStoneList[id] * mileStones)
    }

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
        const interval = setInterval(() => {
            const currentGame = game
            setGame({...currentGame, balance: currentGame.balance + incomeBonus});
            setWobble(true)
        }, 1000)

        return () => clearInterval(interval);

    }, [game, incomeBonus, setGame]);

    useEffect(() => {
        const clickBonus =
            calcBonus(0) +
            calcBonus(1) +
            calcBonus(2) +
            calcBonus(3) +
            calcBonus(4)
        setClickBonus(clickBonus);
        const incomeBonus =
            calcBonus(5) +
            calcBonus(6) +
            calcBonus(7) +
            calcBonus(8) +
            calcBonus(9)
        setIncomeBonus(Math.floor(incomeBonus))
    }, [game.upgrades]);

    if (isPending) {
        return <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress color="inherit"/>
        </Box>
    }

    if (isError || !isSuccess) {
        return <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography>Error: {error?.message}</Typography>
        </Box>
    }

    return (
        <>
            <Header/>
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <Container maxWidth="xs" sx={{order: {lg: 2, xs: 1}}} style={{
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: '20px'
                }}>
                    <Container maxWidth="xs" style={{maxHeight: '1000px', overflowY: 'auto', textAlign: 'center'}}>
                        <Box p={2}>
                            <div style={{marginBottom: '20px'}}>
                                <BalanceComponent balance={game.balance}/>
                            </div>
                            <div style={{marginBottom: '10px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Klick Bonus {formatNumber(clickBonus)}€
                                </Typography>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <Typography variant="h6" gutterBottom>
                                    Passives Einkommen {formatNumber(incomeBonus)}€
                                </Typography>
                            </div>
                            <div>
                                <img
                                    style={{cursor: 'pointer'}}
                                    onClick={handleClick}
                                    draggable={false}
                                    onAnimationEnd={() => setWobble(false)}
                                    className={wobble ? 'wobble' : ''}
                                    src={icon}
                                    alt="Logo"
                                ></img>
                            </div>
                        </Box>
                    </Container>
                </Container>
                <Container maxWidth="xs" sx={{
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: '20px',
                    order: {lg: 1, xs: 2}
                }}>
                    <ClickUpgradeList/>
                </Container>
                <Container maxWidth="xs" style={{
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: '20px',
                    order: 3
                }}>
                    <IncomeUpgradeList/>
                </Container>
            </div>
        </>
    );
};

export default Home;