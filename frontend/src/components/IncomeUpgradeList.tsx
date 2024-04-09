import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import IncomeUpgrade1 from "./IncomeUpgrade/IncomeUpgrade1.tsx";
import IncomeUpgrade2 from "./IncomeUpgrade/IncomeUpgrade2.tsx";
import IncomeUpgrade3 from "./IncomeUpgrade/IncomeUpgrade3.tsx";
import IncomeUpgrade4 from "./IncomeUpgrade/IncomeUpgrade4.tsx";
import IncomeUpgrade5 from "./IncomeUpgrade/IncomeUpgrade5.tsx";

const IncomeUpgradeList = () => {
    return(
        <Container maxWidth="xs" style={{ maxHeight: '1000px', overflowY: 'auto', textAlign: 'center' }}>
            <Box p={2}>
                <div style={{marginBottom: '20px'}}>
                    <Typography>Passives Einkommen Upgraden</Typography>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <IncomeUpgrade1/>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <IncomeUpgrade2 />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <IncomeUpgrade3 />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <IncomeUpgrade4 />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <IncomeUpgrade5 />
                </div>
            </Box>
        </Container>
    )
}

export default IncomeUpgradeList;