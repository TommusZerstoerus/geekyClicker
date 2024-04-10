export type SaveDTO = {
    username: string,
    upgrades: SavedUpgrade[],
    balance: number
}

type SavedUpgrade = {
    upgradeID: number,
    level: number
}