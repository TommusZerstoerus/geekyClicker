export type SaveDTO = {
    username: string,
    upgrades: SavedUpgrade[],
    balance: number,
    unlockedStocks: boolean
}

type SavedUpgrade = {
    upgradeID: number,
    level: number
}