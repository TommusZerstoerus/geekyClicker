package de.tommus.model

import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object Users : IntIdTable() {
    val username = varchar("username", 128).uniqueIndex()
    val password = varchar("password", 128)
    val balance = long("balance").default(10L)
    val unlockedStocks = bool("unlockedStocks").default(false)
    val unlockedRoulette = bool("unlockedRoulette").default(false)
}

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(Users)

    var username by Users.username
    var password by Users.password
    var balance by Users.balance
    var unlockedStocks by Users.unlockedStocks
    var unlockedRoulette by Users.unlockedRoulette

    fun toDto(): UserDTO {
        return UserDTO(
            id = id.value,
            username = username,
            password = password,
            balance = balance,
            unlockedStocks = unlockedStocks,
            unlockedRoulette = unlockedRoulette
        )
    }
}