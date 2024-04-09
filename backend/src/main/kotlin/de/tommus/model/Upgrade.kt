package de.tommus.model

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Upgrades : IntIdTable() {
    val username = varchar("username", 128).uniqueIndex()

    val click1upgrade = integer("click1upgrade").default(0)
    val click2upgrade = integer("click2upgrade").default(0)
    val click3upgrade = integer("click3upgrade").default(0)
    val click4upgrade = integer("click4upgrade").default(0)
    val click5upgrade = integer("click5upgrade").default(0)

    val income1upgrade = integer("income1upgrade").default(0)
    val income2upgrade = integer("income2upgrade").default(0)
    val income3upgrade = integer("income3upgrade").default(0)
    val income4upgrade = integer("income4upgrade").default(0)
    val income5upgrade = integer("income5upgrade").default(0)
}

class UpgradeEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UpgradeEntity>(Upgrades)

    var username by Upgrades.username

    var click1upgrade by Upgrades.click1upgrade
    var click2upgrade by Upgrades.click2upgrade
    var click3upgrade by Upgrades.click3upgrade
    var click4upgrade by Upgrades.click4upgrade
    var click5upgrade by Upgrades.click5upgrade

    var income1upgrade by Upgrades.income1upgrade
    var income2upgrade by Upgrades.income2upgrade
    var income3upgrade by Upgrades.income3upgrade
    var income4upgrade by Upgrades.income4upgrade
    var income5upgrade by Upgrades.income5upgrade

    fun toDto(): UpgradeDTO {
        return UpgradeDTO(
            username = username,
            click1upgrade = click1upgrade,
            click2upgrade = click2upgrade,
            click3upgrade = click3upgrade,
            click4upgrade = click4upgrade,
            click5upgrade = click5upgrade,
            income1upgrade = income1upgrade,
            income2upgrade = income2upgrade,
            income3upgrade = income3upgrade,
            income4upgrade = income4upgrade,
            income5upgrade = income5upgrade
        )
    }
}