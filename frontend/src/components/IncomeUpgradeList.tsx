import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import UpgradeBox from "./UpgradeBox.tsx";

const IncomeUpgradeList = () => {
    return (
        <Container maxWidth="xs" style={{maxHeight: '1000px', overflowY: 'auto', textAlign: 'center'}}>
            <Box p={2}>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h4">Einkommen Upgraden</Typography>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={5} basePrice={1000} name={"Einen weiteren Monitor aufstellen"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={6} basePrice={10000} name={"Musik hören"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={7} basePrice={50000} name={"Git Pipeline schreiben"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={8} basePrice={100000} name={"Kaffeevollautomat kaufen"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={9} basePrice={1000000} name={"Python verbieten"}/>
                </div>
            </Box>
        </Container>
    )
}

export default IncomeUpgradeList;