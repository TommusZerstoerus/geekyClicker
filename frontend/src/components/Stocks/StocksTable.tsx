import Box from "@mui/material/Box";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import StocksCell from "./StocksCell.tsx";

export type Stock = {
    id: number,
    name: string,
    price: number,
}

const StocksTable = () => {
    const stocks = [
        {id: 1, name: 'AAPL', price: 1000},
        {id: 2, name: 'MSFT', price: 10000},
        {id: 3, name: 'GOOGL', price: 100000},
        {id: 4, name: 'AMZN', price: 500000},
        {id: 5, name: 'TSLA', price: 1000000},
    ]


    return (
        <Box sx={{ mt: 5, bgcolor: "lightgray" }}>
            <Table aria-label="Aktien">
                <TableHead>
                    <TableRow>
                        <TableCell>Aktie</TableCell>
                        <TableCell>Preis</TableCell>
                        <TableCell>Wert</TableCell>
                        <TableCell>Kauf/Verkauf</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock) => (
                        <StocksCell key={stock.id} stock={stock} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default StocksTable