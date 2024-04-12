import Typography from '@mui/material/Typography';

export function formatNumber(balance: number) {
    const numString = balance.toString();
    return numString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type BalanceComponentProps = {
    balance: number
}

function BalanceComponent({ balance }: BalanceComponentProps) {
    const formattedBalance = formatNumber(balance);

    return (
        <Typography variant="h4">
            Balance {formattedBalance}€
        </Typography>
    );
}

export default BalanceComponent;