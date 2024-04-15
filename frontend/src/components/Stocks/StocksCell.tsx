import {Grid, TableCell, TableRow} from "@mui/material";
import {Stock} from "./StocksTable.tsx";
import {formatNumber} from "../BalanceComponent.tsx";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useGame} from "../../context/GameContext.ts";

type StockCellProps = {
    stock: Stock
}

const StocksCell = ({stock}: StockCellProps) => {
    const [bought, setBought] = useState(false)
    const [currentValue, setCurrentValue] = useState(stock.price)
    const {game, setGame} = useGame()

    const buyStock = () => {
        setBought(true)
        setGame({...game, balance: game.balance - stock.price})
    }

    const sellStock = () => {
        setBought(false)
        setGame({...game, balance: game.balance + stock.price})
    }

    return (
        <TableRow key={stock.id}>
            <TableCell>{stock.name}</TableCell>
            <TableCell>{formatNumber(stock.price)}€</TableCell>
            <TableCell
                sx={{color: currentValue >= stock.price ? "green" : "red"}}>{formatNumber(currentValue)}€</TableCell>
            <TableCell>
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