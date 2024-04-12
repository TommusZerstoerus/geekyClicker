import {useEffect, useState} from "react";
import {Button, Container, FormControlLabel, LinearProgress, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useGame} from "../context/GameContext.ts";
import {ShoppingCart} from "@mui/icons-material";
import {IOSSwitch} from "./IOSSwitch.tsx";
import {formatNumber} from "./BalanceComponent.tsx";
import {BasePriceList, UpgradeBonusList} from "../model/UpgradeList.ts";

type ClickUpgradeProps = {
    id: number,
    name: string,
    type: UpgradeType
}

export enum UpgradeType {
    CLICK = "CLICK",
    INCOME = "INCOME"
}

const UpgradeBox = ({id, name, type}: ClickUpgradeProps) => {
    const basePrice = BasePriceList[id]
    const [upgradePrice, setUpgradePrice] = useState(basePrice);
    const [tenTimes, setTenTimes] = useState(false);
    const {game, setGame} = useGame()
    const balance = game.balance
    const level = game.upgrades[id]
    const [oldValue, setOldValue] = useState(Math.floor(level / 100))
    const upgradePriceText = formatNumber(upgradePrice);
    const [animateBar, setAnimateBar] = useState(false)

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
        setOldValue(Math.floor(level / 100))
    }, [level, tenTimes]);

    const newValue = Math.floor(level / 100)
    if (newValue > oldValue) {
        setAnimateBar(true)
        setOldValue(newValue)
    }

    return (
        <Container maxWidth="lg" style={{textAlign: "center"}}>
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
                <Typography variant="body2">
                    {type === UpgradeType.CLICK ? `(+${UpgradeBonusList[id]}€)` : `(+${UpgradeBonusList[id]}€/s)`}
                </Typography>
                <Typography variant="body2">
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
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <LinearProgress
                        color={"secondary"}
                        className={animateBar ? "animate-bar" : ""}
                        onAnimationEnd={() => setAnimateBar(false)}
                        variant="determinate"
                        value={level % 100}
                    />
                    <Typography>{level % 100} / 100</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default UpgradeBox;