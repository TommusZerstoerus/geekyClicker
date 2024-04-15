import {Grid, TableCell, TableRow} from "@mui/material";
import {Stock} from "./StocksTable.tsx";
import {formatNumber} from "../BalanceComponent.tsx";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useGame} from "../../context/GameContext.ts";

type StockCellProps = {
    stock: Stock
}

const StocksCell = ({stock}: StockCellProps) => {
    const [bought, setBought] = useState(false)
    const [currentValue, setCurrentValue] = useState(stock.price)
    const [buyPrice, setBuyPrice] = useState(0)
    const {game, setGame} = useGame()
    const difference = formatNumber(currentValue - buyPrice)

    const buyStock = () => {
        setBought(true)
        setBuyPrice(currentValue)
        setGame({...game, balance: game.balance - stock.price})
    }

    const sellStock = () => {
        setBought(false)
        setGame({...game, balance: game.balance + stock.price})
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.random() < 0.5 ? -1 : 1;
            const randomChange = Math.floor(Math.random() * (stock.price / 10)) * randomNumber;
            if (currentValue + randomChange >= 0) {
                setCurrentValue(stock.price);
            }
            setCurrentValue(prevValue => prevValue + randomChange);
        }, 5000);

        return () => clearInterval(interval);
    }, [game.unlockedStocks]);

    return (
        <TableRow key={stock.id}>
            <TableCell sx={{width: '50px'}}>{stock.name}</TableCell>
            <TableCell
                sx={{
                    width: '200px',color: bought ? (currentValue >= buyPrice ? "green" : "red") : "black"
                }}
            >{formatNumber(currentValue)}€ {bought && `(${difference}€)`}</TableCell>
            <TableCell sx={{width: '200px'}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button onClick={buyStock} color="secondary" variant="contained"
                                disabled={bought || stock.price > game.balance}>Kauf</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={sellStock} color="secondary" variant="contained"
                                disabled={!bought}>Verkauf</Button>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    )
}

export default StocksCell