import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import UpgradeBox, {UpgradeType} from "./UpgradeBox.tsx";

const ClickUpgradeList = () => {
    return (
        <Container maxWidth="xs" style={{ overflowY: 'auto', textAlign: 'center' }}>
            <Box p={2}>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h4">Klick Bonus</Typography>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={0} basePrice={10} name={"Kotlin lernen"} type={UpgradeType.CLICK}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={1} basePrice={100} name={"Cache leeren"} type={UpgradeType.CLICK}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={2} basePrice={500} name={"Merge Konflikte lösen"} type={UpgradeType.CLICK}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={3} basePrice={1000} name={"Boris nach Hilfe fragen"} type={UpgradeType.CLICK}/>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <UpgradeBox id={4} basePrice={2000} name={"Force Push auf Main"} type={UpgradeType.CLICK}/>
                </div>
            </Box>
        </Container>
    )
}

export default ClickUpgradeList;