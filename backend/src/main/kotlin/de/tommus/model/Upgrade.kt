package de.tommus.model

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Upgrades : IntIdTable() {
    val userID = integer("userID").references(Users.id)
    val upgradeID = integer("upgradeID").default(-1)
    val level = integer("level").default(0)
}

class UpgradeEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UpgradeEntity>(Upgrades)

    var userID by Upgrades.userID
    var upgradeID by Upgrades.upgradeID
    var level by Upgrades.level

    fun toDto(): UpgradeDTO {
        return UpgradeDTO(
            id = id.value,
            userID = userID,
            upgradeID = upgradeID,
            level = level
        )
    }
}