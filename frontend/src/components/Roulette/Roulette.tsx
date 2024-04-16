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

function getColorString(color: Color): String {
    switch (color) {
        case Color.red:
            return "Gerollt wurde Rot"
        case Color.black:
            return "Gerollt wurde Schwarz"
        case Color.green:
            return "Gerollt wurde Grün"
        default:
            return ""
    }
}

const RouletteTable = () => {
    const [bet, setBet] = useState(0)
    const [currentBet, setCurrentBet] = useState(0)
    const [spinning, setSpinning] = useState(false)
    const [won, setWon] = useState(Color.none)
    const [lost, setLost] = useState(false)
    const [selectedColor, setSelectedColor] = useState(Color.red);
    const [winColor, setWinColor] = useState(Color.none)
    const {game, setGame} = useGame()

    const startSpin = () => {
        setBet(currentBet)
        setWinColor(Color.none)
        setSpinning(true)
        setWon(Color.none)
        setLost(false)
        setTimeout(() => {
            const randomOutcome = Math.random();
            if (randomOutcome < 0.485) {
                setWinColor(Color.red)
            } else if (randomOutcome < 0.97) {
                setWinColor(Color.black)
            } else {
                setWinColor(Color.green)
            }
            if (randomOutcome < 0.485 && selectedColor == Color.red) {
                winGame(Color.red);
            } else if (randomOutcome < 0.97 && selectedColor == Color.black) {
                winGame(Color.black);
            } else if (randomOutcome >= 0.97 && selectedColor == Color.green) {
                winGame(Color.green);
            } else {
                loseGame()
            }
            setSpinning(false)
        }, 5000)
    }

    const loseGame = () => {
        setLost(true)
        const newBalance = game.balance - currentBet
        if(currentBet > newBalance) {
            setGame({...game, balance: newBalance})
            setCurrentBet(newBalance)
        } else {
            setGame({...game, balance: newBalance})
        }
    }

    const winGame = (color: Color) => {
        setWon(color)
        if (color == Color.red) {
            setGame({...game, balance: game.balance + currentBet * 2})
        } else {
            setGame({...game, balance: game.balance + currentBet * 14})
        }
    }

    return (
        <Box sx={{
            width: '95%',
            borderRadius: {lg: 5, xs: 3},
            bgcolor: "lightgray",
            maxWidth: "xs",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 2,
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
            <Grid container sx={{display: 'flex', justifyContent: 'center', mt: 3, mb: 2}}>
                <Grid item xs={4}>
                    <Button
                        disabled={spinning}
                        variant="contained"
                        sx={{
                            width: 100,
                            height: 100,
                            color: 'red',
                            backgroundColor: 'red',
                            "&:hover": {
                                backgroundColor: "red"
                            },
                            cursor: 'pointer',
                            border: selectedColor === Color.red ? '5px solid yellow' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.red)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        disabled={spinning}
                        variant="contained"
                        sx={{
                            width: 100,
                            height: 100,
                            color: 'black',
                            backgroundColor: 'black',
                            "&:hover": {
                                backgroundColor: "black"
                            },
                            cursor: 'pointer',
                            border: selectedColor === Color.black ? '5px solid yellow' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.black)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        disabled={spinning}
                        variant="contained"
                        sx={{
                            width: 100,
                            height: 100,
                            color: 'green',
                            backgroundColor: 'green',
                            "&:hover": {
                                backgroundColor: "green"
                            },
                            cursor: 'pointer',
                            border: selectedColor === Color.green ? '5px solid yellow' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.green)}
                    />
                </Grid>
            </Grid>
            <Typography>{getColorString(winColor)}</Typography>
            {won !== Color.none && <Typography color="green">{formatNumber(bet * 2)}€ Gewonnen!</Typography>}
            {lost && <Typography color="red">{formatNumber(bet)}€ Verloren!</Typography>}
            {spinning && <Typography>Spinning...</Typography>}
            <Button variant="contained" sx={{mt: 2}} onClick={startSpin} disabled={spinning}>
                Spin
            </Button>
        </Box>
    );
}

export default RouletteTable;