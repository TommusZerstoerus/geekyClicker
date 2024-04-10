package de.tommus.services.impl

import de.tommus.model.*
import de.tommus.services.`interface`.UpgradeServiceInterface
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

class UpgradeService : UpgradeServiceInterface {
    override suspend fun getUpgrades(userID: Int): List<UpgradeDTO> = transaction {
        Upgrades.select { Upgrades.userID eq userID }.map {
            UpgradeDTO(
                id = it[Upgrades.id].value,
                userID = it[Upgrades.userID],
                upgradeID = it[Upgrades.upgradeID],
                level = it[Upgrades.level]
            )
        }
    }

    override suspend fun updateUpgrades(upgrade: UpgradeDTO): Boolean = transaction {
        Upgrades.update({ Upgrades.id eq upgrade.id }) {
            it[level] = upgrade.level
        } > 0
    }

    override suspend fun createUpgrades(userID: Int, upgradeID: Int, level: Int): UpgradeDTO = transaction() {
        UpgradeEntity.new {
            this.userID = userID
            this.upgradeID = upgradeID
            this.level = level
        }.toDto()
    }
}
