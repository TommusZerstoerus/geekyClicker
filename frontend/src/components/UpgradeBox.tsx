import {useEffect, useState} from "react";
import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useGame} from "../context/GameContext.ts";
import {ShoppingCart} from "@mui/icons-material";

type ClickUpgradeProps = {
    id: number,
    name: string,
    basePrice: number,
}

const UpgradeBox = ({basePrice, id, name}: ClickUpgradeProps) => {
    const [upgradePrice, setUpgradePrice] = useState(basePrice);
    const {game, setGame} = useGame()
    const balance = game.balance
    const level = game.upgrades[id]

    function calcUpgradePrice() {
        if (level === 0) {
            setUpgradePrice(basePrice)
        } else {
            setUpgradePrice(upgradePrice => upgradePrice * level);
        }
    }

    function buyUpgrade() {
        setGame({...game, balance: balance - upgradePrice, upgrades: {...game.upgrades, [id]: level + 1}})
    }

    useEffect(() => {
        setUpgradePrice(basePrice)
        calcUpgradePrice()
    }, [level]);

    return (
        <Container maxWidth="sm" style={{textAlign: "center"}}>
            <Box
                borderRadius={8}
                boxShadow={3}
                p={3}
                sx={{
                    background: 'linear-gradient(0deg, hsla(24, 73%, 53%, 1) 10%, hsla(0, 0%, 100%, 1) 100%)'
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
                            onClick={buyUpgrade}>{upgradePrice}€</Button> :
                    <Button startIcon={<ShoppingCart/>} variant="contained" color="secondary"
                            disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default UpgradeBox;