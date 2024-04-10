import {createContext, useContext} from 'react';
import {Game} from "../model/Game.ts";

const initialGameState: Game = {
    click1upgrade: 0,
    click2upgrade: 0,
    click3upgrade: 0,
    click4upgrade: 0,
    click5upgrade: 0,
    income1upgrade: 0,
    income2upgrade: 0,
    income3upgrade: 0,
    income4upgrade: 0,
    income5upgrade: 0,
    balance: 0
};

export const GameContext = createContext<{
    game: Game;
    setGame: (client: Game) => void;
}>({
    game: initialGameState,
    setGame: (newGame) => {
        // @ts-ignore
        this.game = newGame
    },
});

const useGame = () => useContext(GameContext);

export {useGame};