import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useClient} from "../../context/ClientContext.ts";
import {useUpgrade} from "../../context/UpgradeContext.tsx";
import {useEffect, useState} from "react";

const ClickUpgrade3 = () => {
    const [upgradePrice, setUpgradePrice] = useState(500);
    const {client, setClient} = useClient()
    const {upgrade, setUpgrade} = useUpgrade()
    const balance = client.balance

    function calcUpgradePrice() {
        setUpgradePrice(UpgradePrice => UpgradePrice * upgrade.click3upgrade);
    }

    function buyUpgrade() {
        setClient({...client, balance: balance - upgradePrice})
        setUpgrade({...upgrade, click3upgrade: upgrade.click3upgrade + 1})
        calcUpgradePrice()
    }

    useEffect(() => {
        calcUpgradePrice()
    }, [upgrade.click3upgrade]);

    return (
        <Container maxWidth="sm" style={{textAlign: "center"}}>
            <Box border={2} borderColor="inherit" borderRadius={8} p={3}
                 sx={{background: "linear-gradient(180deg, hsla(0, 0%, 100%, 1) 40%, hsla(0, 59%, 54%, 1) 100%)"}}>
                <Typography variant="body1">
                    Merge Konflikte lösen
                </Typography>
                <Typography>
                    Stufe {upgrade.click3upgrade}
                </Typography>
                {balance >= upgradePrice ? <Button variant="contained" onClick={buyUpgrade}>{upgradePrice}€</Button> :
                    <Button variant="contained" disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default ClickUpgrade3;