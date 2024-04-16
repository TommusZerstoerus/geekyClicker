import {createContext, useContext} from 'react';
import {Game} from "../model/Game.ts";

const initialGameState: Game = {
    balance: 0,
    upgrades: {},
    unlockedStocks: false
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