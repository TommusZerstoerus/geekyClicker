import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import UpgradeBox from "./UpgradeBox.tsx";

const ClickUpgradeList = () => {
    return (
        <Container maxWidth="xs" style={{ overflowY: 'auto', textAlign: 'center' }}>
            <Box p={2}>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h4">Klick Bonus Upgraden</Typography>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={0} basePrice={10} name={"Kotlin lernen"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={1} basePrice={100} name={"Cache leeren"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={2} basePrice={500} name={"Merge Konflikte lösen"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={3} basePrice={1000} name={"Boris nach Hilfe fragen"}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={4} basePrice={2000} name={"Force Push auf Main"}/>
                </div>
            </Box>
        </Container>
    )
}

export default ClickUpgradeList;