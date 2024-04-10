import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useClient} from "../../context/ClientContext.ts";
import {useUpgrade} from "../../context/UpgradeContext.tsx";
import {useEffect, useState} from "react";

const ClickUpgrade4 = () => {
    const [upgradePrice, setUpgradePrice] = useState(1000);
    const {client, setClient} = useClient()
    const {upgrade, setUpgrade} = useUpgrade()
    const balance = client.balance

    function calcUpgradePrice() {
        setUpgradePrice(UpgradePrice => UpgradePrice * upgrade.click4upgrade);
    }

    function buyUpgrade() {
        setClient({...client, balance: balance - upgradePrice})
        setUpgrade({...upgrade, click4upgrade: upgrade.click4upgrade + 1})
        calcUpgradePrice()
    }

    useEffect(() => {
        calcUpgradePrice()
    }, [upgrade.click4upgrade]);

    return(
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <Box border={2} borderColor="primary.main" borderRadius={8} p={3}>
                <Typography variant="body1">
                    Upgrade 4
                </Typography>
                <Typography>
                    Stufe {upgrade.click4upgrade}
                </Typography>
                {balance >= upgradePrice ? <Button variant="contained" onClick={buyUpgrade}>{upgradePrice}€</Button> : <Button variant="contained" disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default ClickUpgrade4;