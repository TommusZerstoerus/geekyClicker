import ClickUpgrade1 from "./ClickUpgrade/ClickUpgrade1.tsx";
import ClickUpgrade2 from "./ClickUpgrade/ClickUpgrade2.tsx";
import ClickUpgrade3 from "./ClickUpgrade/ClickUpgrade3.tsx";
import ClickUpgrade4 from "./ClickUpgrade/ClickUpgrade4.tsx";
import ClickUpgrade5 from "./ClickUpgrade/ClickUpgrade5.tsx";
import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";

const ClickUpgradeList = () => {
    return (
        <Container maxWidth="xs" style={{ maxHeight: '1000px', overflowY: 'auto', textAlign: 'center' }}>
            <Box p={2}>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h4">Klick Bonus Upgraden</Typography>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <ClickUpgrade1/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <ClickUpgrade2/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <ClickUpgrade3/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <ClickUpgrade4/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <ClickUpgrade5/>
                </div>
            </Box>
        </Container>
    )
}

export default ClickUpgradeList;