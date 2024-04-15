export type SaveDTO = {
    username: string,
    upgrades: SavedUpgrade[],
    balance: number,
    boughtStocks: boolean
}

type SavedUpgrade = {
    upgradeID: number,
    level: number
}