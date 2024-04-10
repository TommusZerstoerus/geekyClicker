package de.tommus.services.`interface`

import de.tommus.model.UpgradeDTO

interface UpgradeServiceInterface {
    suspend fun updateUpgrades(upgrade: UpgradeDTO): Boolean
    suspend fun createUpgrades(userID: Int, upgradeID: Int, level: Int): UpgradeDTO
    suspend fun getUpgrades(userID: Int): List<UpgradeDTO>
}