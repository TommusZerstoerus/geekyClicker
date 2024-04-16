import {Typography} from "@mui/material";
import {formatNumber} from "../BalanceComponent.tsx";
import Box from "@mui/material/Box";

const PassiveIncome = ({incomeBonus}: {incomeBonus: number}) => {
    return (
        <Box sx={{marginBottom: '20px'}}>
            <Typography variant="h6" gutterBottom>
                Passives Einkommen {formatNumber(incomeBonus)}€/s
            </Typography>
        </Box>
    )
}

export default PassiveIncome