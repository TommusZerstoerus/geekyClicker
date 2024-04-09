package de.tommus.services.`interface`

import de.tommus.model.UpgradeDTO

interface UpgradeServiceInterface {
    suspend fun getUpgrades(username: String): UpgradeDTO?
    suspend fun updateUpgrades(upgrade: UpgradeDTO): Boolean
    suspend fun createUpgrades(username: String): UpgradeDTO
}