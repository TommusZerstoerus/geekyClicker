import {Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useClient} from "../../context/ClientContext.ts";
import {useUpgrade} from "../../context/UpgradeContext.tsx";
import {useEffect, useState} from "react";

const IncomeUpgrade4 = () => {
    const [upgradePrice, setUpgradePrice] = useState(100000);
    const {client, setClient} = useClient()
    const {upgrade, setUpgrade} = useUpgrade()
    const balance = client.balance

    function calcUpgradePrice() {
        setUpgradePrice(UpgradePrice => UpgradePrice * upgrade.income4upgrade);
    }

    function buyUpgrade() {
        setClient({...client, balance: balance - upgradePrice})
        setUpgrade({...upgrade, income4upgrade: upgrade.income4upgrade + 1})
        calcUpgradePrice()
    }

    useEffect(() => {
        calcUpgradePrice()
    }, [upgrade.income4upgrade]);

    return(
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <Box border={2} borderColor="primary.main" borderRadius={8} p={3}>
                <Typography variant="body1">
                    Einkommen Upgrade 4
                </Typography>
                <Typography>
                    Stufe {upgrade.income4upgrade}
                </Typography>
                {balance >= upgradePrice ? <Button variant="contained" onClick={buyUpgrade}>{upgradePrice}€</Button> : <Button variant="contained" disabled>{upgradePrice}€</Button>}
            </Box>
        </Container>
    )
}

export default IncomeUpgrade4;