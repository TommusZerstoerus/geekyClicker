import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import UpgradeBox, {UpgradeType} from "./UpgradeBox.tsx";

const IncomeUpgradeList = () => {
    return (
        <Container maxWidth="xs" style={{ overflowY: 'auto', textAlign: 'center'}}>
            <Box p={2}>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h4">Einkommen Upgraden</Typography>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={5} basePrice={1000} name={"Einen weiteren Monitor aufstellen"} type={UpgradeType.INCOME}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={6} basePrice={10000} name={"Musik hören"} type={UpgradeType.INCOME}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={7} basePrice={50000} name={"Git Pipeline schreiben"} type={UpgradeType.INCOME}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={8} basePrice={100000} name={"Kaffeevollautomat kaufen"} type={UpgradeType.INCOME}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={9} basePrice={1000000} name={"Python verbieten"} type={UpgradeType.INCOME}/>
                </div>
            </Box>
        </Container>
    )
}

export default IncomeUpgradeList;