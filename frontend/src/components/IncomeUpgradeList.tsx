import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import UpgradeBox, {UpgradeType} from "./UpgradeBox.tsx";

const IncomeUpgradeList = () => {
    return (
        <Container maxWidth="xs" sx={{
            textAlign: "center",
            flex: "1",
            display: "flex",
            justifyContent: "center",
            marginBottom: '20px',
            order: 3
        }}>
            <Container maxWidth="xs" style={{overflowY: 'auto', textAlign: 'center'}}>
                <Box p={2}>
                    <div style={{marginBottom: '20px'}}>
                        <Typography variant="h4">Einkommen</Typography>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={5} name={"Einen weiteren Monitor aufstellen"} type={UpgradeType.INCOME}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={6} name={"Musik hören"} type={UpgradeType.INCOME}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={7} name={"Git Pipeline schreiben"} type={UpgradeType.INCOME}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={8} name={"Kaffeevollautomat kaufen"} type={UpgradeType.INCOME}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={9} name={"Python verbieten"} type={UpgradeType.INCOME}/>
                    </div>
                </Box>
            </Container>
        </Container>

    )
}

export default IncomeUpgradeList;