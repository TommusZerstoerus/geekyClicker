import {Typography} from "@mui/material";
import {formatNumber} from "../BalanceComponent.tsx";
import Box from "@mui/material/Box";

const ActiveIncome = ({activeIncome}: {activeIncome: number}) => {
    return (
        <Box sx={{marginBottom: '20px'}}>
            <Typography variant="h6" gutterBottom>
                Klick Bonus {formatNumber(activeIncome)}€
            </Typography>
        </Box>
    )
}

export default ActiveIncome