import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
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
        setGame({...game, balance: game.balance - currentBet})
        console.log(getColorString(selectedColor))
        setBet(currentBet)
        setWinColor(Color.none)
        setSpinning(true)
        setWon(Color.none)
        setLost(false)
        const randomOutcome = Math.random();
        if (randomOutcome < 0.485) {
            setWinColor(Color.red)
        } else if (randomOutcome < 0.97) {
            setWinColor(Color.black)
        } else {
            setWinColor(Color.green)
        }
        setTimeout(() => {
            if (randomOutcome < 0.485 && selectedColor == Color.red) {
                console.log("RED WIN")
                winGame(Color.red);
            } else if (randomOutcome >= 0.485 && randomOutcome < 0.97 && selectedColor == Color.black) {
                console.log("BLACK WIN")
                winGame(Color.black);
            } else if (randomOutcome >= 0.97 && selectedColor == Color.green) {
                console.log("GREEN WIN")
                winGame(Color.green);
            } else {
                loseGame()
            }
            setSpinning(false)
        }, 5000)
    }

    const loseGame = () => {
        setLost(true)
    }

    const winGame = (color: Color) => {
        setWon(color)
        const newBalance = game.balance - bet
        if (color == Color.red || color == Color.black) {
            const win = bet * 2
            setGame({...game, balance: newBalance + win})
        } else {
            const win = bet * 14
            setGame({...game, balance: newBalance + win})
        }
    }

    useEffect(() => {
        if (game.balance < currentBet) {
            setCurrentBet(game.balance)
        }
    }, [game.balance]);

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
            mt: 5,
            p: 2
        }}>
            <Typography>Roulette</Typography>
            <TextField
                label="Einsatz"
                type="number"
                color="secondary"
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
                <Grid item xs={2}>
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
                            border: selectedColor === Color.red ? '5px solid yellow' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.red)}
                    />
                </Grid>
                <Grid item xs={2}>
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
                            border: selectedColor === Color.black ? '5px solid yellow' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.black)}
                    />
                </Grid>
                <Grid item xs={2}>
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
                            border: selectedColor === Color.green ? '5px solid yellow' : 'none',
                        }}
                        onClick={() => setSelectedColor(Color.green)}
                    />
                </Grid>
            </Grid>
            {!spinning && <Typography>{getColorString(winColor)}</Typography>}
            {won !== Color.none && <Typography color="green">{formatNumber(bet * 2)}€ Gewonnen!</Typography>}
            {lost && <Typography color="red">{formatNumber(bet)}€ Verloren!</Typography>}
            {spinning && <Typography>Spinning...</Typography>}
            {spinning &&
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                    <Box
                        className={winColor === Color.red ? "animated-red" : winColor === Color.black ? "animated-black" : "animated-green"}
                        sx={{
                            width: 100,
                            height: 100,
                            "&:hover": {
                                backgroundColor: "green"
                            },
                        }}
                    >

                    </Box>
                </Box>
            }
            <Box>
                <Button variant="contained" color="secondary" sx={{mt: 2, width: '50%'}} onClick={startSpin}
                        disabled={spinning}>
                    Spin
                </Button>
            </Box>
        </Box>
    );
}

export default RouletteTable;