import Box from "@mui/material/Box";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import StocksCell from "./StocksCell.tsx";
import {stocks} from "../../model/StockList.ts";

export type Stock = {
    id: number,
    name: string,
    price: number,
}

const StocksTable = () => {

    return (
        <Box sx={{
            mt: 5,
            bgcolor: "lightgray",
            borderRadius: {lg: 8, xs: 4},
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Aktie</TableCell>
                        <TableCell>Preis</TableCell>
                        <TableCell>Kauf/Verkauf</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock) => (
                        <StocksCell key={stock.id} stock={stock}/>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default StocksTable