import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useState} from "react";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useGame} from "../../context/GameContext.ts";
import {formatNumber} from "../BalanceComponent.tsx";

enum Color {
    none,
    red,
    black,
    green
}

const RouletteTable = () => {
    const [bet, setBet] = useState(0)
    const [currentBet, setCurrentBet] = useState(0)
    const [spinning, setSpinning] = useState(false)
    const [won, setWon] = useState(Color.none)
    const [lost, setLost] = useState(false)
    const [selectedColor, setSelectedColor] = useState(Color.none);
    const {game, setGame} = useGame()

    const startSpin = () => {
        setBet(currentBet)
        setSpinning(true)
        setWon(Color.none)
        setLost(false)
        setTimeout(() => {
            const randomOutcome = Math.random();
            if (randomOutcome < 0.485) {
                winGame(Color.red);
            } else if (randomOutcome < 0.97) {
                winGame(Color.black);
            } else {
                winGame(Color.green);
            }
            setSpinning(false)
        }, 5000)
    }

    const winGame = (color: Color) => {
        setWon(color)
        if(color == Color.red) {
            setGame({...game, balance: game.balance + currentBet * 2})
        } else {
            setGame({...game, balance: game.balance + currentBet * 14})
        }
    }

    return (
        <Box sx={{
            borderRadius: {lg: 8, xs: 4},
            bgcolor: "lightgray",
            maxWidth: "xs",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 5,
            p: 2
        }}>
            <Typography>Roulette</Typography>
            <TextField
                label="Einsatz"
                type="number"
                disabled={spinning}
                helperText={"Aktuelles Guthaben: " + formatNumber(game.balance) + "€"}
                value={currentBet}
                InputProps={{inputProps: {min: 1}, inputMode: 'numeric'}}
                onChange={(event) => {
                    const value = Math.max(0, Math.min(game.balance, Number(event.target.value)));
                    setCurrentBet(value)
                }}
            />
            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'red',
                            cursor: 'pointer',
                            border: selectedColor === Color.red ? '2px solid black' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.red)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'green',
                            cursor: 'pointer',
                            border: selectedColor === Color.green ? '2px solid black' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.green)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'blue',
                            cursor: 'pointer',
                            border: selectedColor === Color.black ? '2px solid black' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.black)}
                    />
                </Grid>
            </Grid>
            {won && <Typography color="green">Gewonnen! {formatNumber(bet * 2)}€</Typography>}
            {lost && <Typography color="red">Verloren! {formatNumber(bet)}€</Typography>}
            {spinning && <Typography>Spinning...</Typography>}
            <Button variant="contained" onClick={startSpin} disabled={spinning}>
                Spin
            </Button>
        </Box>
    );
}

export default RouletteTable;