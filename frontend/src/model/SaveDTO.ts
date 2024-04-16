export type SaveDTO = {
    username: string,
    upgrades: SavedUpgrade[],
    balance: number,
    unlockedStocks: boolean,
    unlockedRoulette: boolean
}

type SavedUpgrade = {
    upgradeID: number,
    level: number
}