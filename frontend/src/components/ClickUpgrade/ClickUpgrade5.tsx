import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useClient} from "../../context/ClientContext.ts";
import {useUpgrade} from "../../context/UpgradeContext.tsx";
import {useEffect, useState} from "react";

const ClickUpgrade5 = () => {
    const [upgradePrice, setUpgradePrice] = useState(2000);
    const {client, setClient} = useClient()
    const {upgrade, setUpgrade} = useUpgrade()
    const balance = client.balance

    function calcUpgradePrice() {
        setUpgradePrice(UpgradePrice => UpgradePrice * upgrade.click5upgrade);
    }

    function buyUpgrade() {
        setClient({...client, balance: balance - upgradePrice})
        setUpgrade({...upgrade, click5upgrade: upgrade.click5upgrade + 1})
        calcUpgradePrice()
    }

    useEffect(() => {
        calcUpgradePrice()
    }, [upgrade.click5upgrade]);

    return(
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <Box border={2} borderColor="primary.main" borderRadius={8} p={3}>
                <Typography variant="body1">
                    Upgrade 5
                </Typography>
                <Typography>
                    Stufe {upgrade.click5upgrade}
                </Typography>
                {balance >= upgradePrice ? <Button variant="contained" onClick={buyUpgrade}>{upgradePrice}€</Button> : <Button variant="contained" disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default ClickUpgrade5;