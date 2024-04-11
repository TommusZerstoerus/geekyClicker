import {useEffect, useState} from "react";
import {Button, Container, FormControlLabel, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useGame} from "../context/GameContext.ts";
import {ShoppingCart} from "@mui/icons-material";
import {IOSSwitch} from "./IOSSwitch.tsx";
import {formatNumber} from "./BalanceComponent.tsx";

type ClickUpgradeProps = {
    id: number,
    name: string,
    basePrice: number,
}

const UpgradeBox = ({basePrice, id, name}: ClickUpgradeProps) => {
    const [upgradePrice, setUpgradePrice] = useState(basePrice);
    const [tenTimes, setTenTimes] = useState(false);
    const {game, setGame} = useGame()
    const balance = game.balance
    const level = game.upgrades[id]

    function calcUpgradePrice() {
        if (tenTimes) {
            setUpgradePrice(calc10Price());
        } else {
            if (level === 0) {
                setUpgradePrice(basePrice)
            } else {
                setUpgradePrice(basePrice * level);
            }
        }
    }

    function calc10Price() {
        return Array.from({length: 10}, (_, i) =>
            (level + i) * basePrice
        ).reduce((sum, current) => sum + current, 0)
    }

    function buyUpgrade() {
        tenTimes ? setGame({
            ...game,
            balance: balance - upgradePrice,
            upgrades: {...game.upgrades, [id]: level + 10}
        }) : setGame({
            ...game,
            balance: balance - upgradePrice,
            upgrades: {...game.upgrades, [id]: level + 1}
        })
    }

    useEffect(() => {
        setUpgradePrice(basePrice)
        calcUpgradePrice()
    }, [level, tenTimes]);

    const upgradePriceText = formatNumber(upgradePrice);

    return (
        <Container maxWidth="sm" style={{textAlign: "center"}}>
            <Box
                borderRadius={8}
                boxShadow={3}
                p={2}
                sx={{
                    background: 'linear-gradient(0deg, hsla(24, 73%, 53%, 1) 10%, hsla(0, 0%, 100%, 1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body1">
                    {name}
                </Typography>
                <Typography>
                    Stufe {level}
                </Typography>
                {balance >= upgradePrice ?
                    <Button startIcon={<ShoppingCart/>} variant="contained" color="secondary"
                            onClick={buyUpgrade}>{upgradePriceText}€</Button> :
                    <Button startIcon={<ShoppingCart/>} variant="contained" color="secondary"
                            disabled>{upgradePriceText}€</Button>}
                <Stack marginTop={'10px'} direction="row" spacing={1} alignItems="center">
                    <Typography>1x</Typography>
                    <FormControlLabel
                        onChange={() => {
                            setTenTimes(!tenTimes)
                        }}
                        control={<IOSSwitch sx={{m: 1}} defaultChecked={false}/>}
                        label={""}/>
                    <Typography>10x</Typography>
                </Stack>
            </Box>
        </Container>
    )
}

export default UpgradeBox;