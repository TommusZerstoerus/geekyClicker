import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useClient} from "../../context/ClientContext.ts";
import {useUpgrade} from "../../context/UpgradeContext.tsx";
import {useEffect, useState} from "react";

const ClickUpgrade2 = () => {
    const [upgradePrice, setUpgradePrice] = useState(100);
    const {client, setClient} = useClient()
    const {upgrade, setUpgrade} = useUpgrade()
    const balance = client.balance

    function calcUpgradePrice() {
        setUpgradePrice(UpgradePrice => UpgradePrice * upgrade.click2upgrade);
    }

    function buyUpgrade() {
        setClient({...client, balance: balance - upgradePrice})
        setUpgrade({...upgrade, click2upgrade: upgrade.click2upgrade + 1})
        calcUpgradePrice()
    }

    useEffect(() => {
        calcUpgradePrice()
    }, [upgrade.click2upgrade]);

    return (
        <Container maxWidth="sm" style={{textAlign: "center"}}>
            <Box border={2} borderColor="inherit" borderRadius={8} p={3}
                 sx={{background: "linear-gradient(180deg, hsla(0, 0%, 100%, 1) 40%, hsla(128, 83%, 72%, 1) 100%)"}}>
                <Typography variant="body1">
                    Cache leeren
                </Typography>
                <Typography>
                    Stufe {upgrade.click2upgrade}
                </Typography>
                {balance >= upgradePrice ? <Button variant="contained" onClick={buyUpgrade}>{upgradePrice}€</Button> :
                    <Button variant="contained" disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default ClickUpgrade2;