import Box from "@mui/material/Box";
import {Container, Typography} from "@mui/material";
import UpgradeBox, {UpgradeType} from "./UpgradeBox.tsx";

const ClickUpgradeList = () => {
    return (
        <Container maxWidth="xs" sx={{
            textAlign: "center",
            flex: "1",
            display: "flex",
            justifyContent: "center",
            marginBottom: '20px',
            order: {lg: 1, xs: 2}
        }}>
            <Container maxWidth="xs" style={{overflowY: 'auto', textAlign: 'center'}}>
                <Box p={2}>
                    <div style={{marginBottom: '20px'}}>
                        <Typography variant="h4">Klick Bonus</Typography>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={0} name={"Kotlin lernen"} type={UpgradeType.CLICK}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={1} name={"Cache leeren"} type={UpgradeType.CLICK}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={2} name={"Merge Konflikte lösen"} type={UpgradeType.CLICK}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={3} name={"Boris nach Hilfe fragen"} type={UpgradeType.CLICK}/>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <UpgradeBox id={4} name={"Force Push auf Main"} type={UpgradeType.CLICK}/>
                    </div>
                </Box>
            </Container>
        </Container>
    )
}

export default ClickUpgradeList;