import {useEffect, useState} from "react";
import {useClient} from "../../context/ClientContext.ts";
import {useUpgrade} from "../../context/UpgradeContext.tsx";
import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";

type ClickUpgradeProps = {
    id: number,
    name: String,
    basePrice: number,
}

const ClickUpgrade = ({id, name, basePrice} : ClickUpgradeProps) => {
    const [upgradePrice, setUpgradePrice] = useState(10);
    const {client, setClient} = useClient()
    const {upgrade, setUpgrade} = useUpgrade()
    const balance = client.balance

    function calcUpgradePrice() {
        setUpgradePrice(UpgradePrice => UpgradePrice * upgrade.click1upgrade);
    }

    function buyUpgrade() {
        setClient({...client, balance: balance - upgradePrice})
        setUpgrade({...upgrade, click1upgrade: upgrade.click1upgrade + 1})
        calcUpgradePrice()
    }

    useEffect(() => {
        calcUpgradePrice()
    }, [upgrade.click1upgrade]);

    return(
        <Container maxWidth="sm" style={{ textAlign: "center"}}>
            <Box
                border={2}
                borderColor="inherit"
                borderRadius={8}
                p={3}
                sx={{
                    background: 'linear-gradient(180deg, hsla(0, 0%, 100%, 1) 40%, hsla(220, 61%, 79%, 1) 100%)'
                }}
            >
                <Typography variant="body1">
                    {name}
                </Typography>
                <Typography>
                    Stufe {upgrade.click1upgrade}
                </Typography>
                {balance >= upgradePrice ? <Button variant="contained" onClick={buyUpgrade}>{upgradePrice}€</Button> : <Button variant="contained" disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default ClickUpgrade;