import Typography from '@mui/material/Typography';

export function formatNumber(balance: number) {
    const numString = balance.toString();
    return numString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type BalanceComponentProps = {
    balance: number,
    heading: boolean
}

function BalanceComponent({ balance, heading }: BalanceComponentProps) {
    const formattedBalance = formatNumber(balance);
    const variant = heading ? "h4" : "h6";

    return (
        <Typography variant={variant}>
            Balance {formattedBalance}€
        </Typography>
    );
}

export default BalanceComponent;