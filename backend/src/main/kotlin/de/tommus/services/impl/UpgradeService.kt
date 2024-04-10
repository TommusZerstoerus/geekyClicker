package de.tommus.services.impl

import de.tommus.model.*
import de.tommus.services.`interface`.UpgradeServiceInterface
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

class UpgradeService : UpgradeServiceInterface {
    override suspend fun getUpgrades(username: String): UpgradeDTO? = transaction {
        val resultRow = Upgrades.select { Upgrades.username eq username }.singleOrNull()
        resultRow?.let {
            UpgradeDTO(
                it[Upgrades.username],
                it[Upgrades.click1upgrade],
                it[Upgrades.click2upgrade],
                it[Upgrades.click3upgrade],
                it[Upgrades.click4upgrade],
                it[Upgrades.click5upgrade],
                it[Upgrades.income1upgrade],
                it[Upgrades.income2upgrade],
                it[Upgrades.income3upgrade],
                it[Upgrades.income4upgrade],
                it[Upgrades.income5upgrade]
            )
        }
    }

    override suspend fun updateUpgrades(upgrade: UpgradeDTO): Boolean = transaction {
        Upgrades.update({ Upgrades.username eq upgrade.username }) {
            it[click1upgrade] = upgrade.click1upgrade
            it[click2upgrade] = upgrade.click2upgrade
            it[click3upgrade] = upgrade.click3upgrade
            it[click4upgrade] = upgrade.click4upgrade
            it[click5upgrade] = upgrade.click5upgrade
            it[income1upgrade] = upgrade.income1upgrade
            it[income2upgrade] = upgrade.income2upgrade
            it[income3upgrade] = upgrade.income3upgrade
            it[income4upgrade] = upgrade.income4upgrade
            it[income5upgrade] = upgrade.income5upgrade
        } > 0
    }

    override suspend fun createUpgrades(username: String): UpgradeDTO = transaction() {
        UpgradeEntity.new {
            this.username = username
            click1upgrade = 1
            click2upgrade = 1
            click3upgrade = 1
            click4upgrade = 1
            click5upgrade = 1
            income1upgrade = 1
            income2upgrade = 1
            income3upgrade = 1
            income4upgrade = 1
            income5upgrade = 1
        }.toDto()
    }
}
