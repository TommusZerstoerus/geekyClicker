package de.tommus.services.impl

import de.tommus.model.*
import de.tommus.services.`interface`.UserServiceInterface
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.security.MessageDigest

class UserService : UserServiceInterface {


    override suspend fun allUser(): List<UserDTO> = transaction {
        UserEntity.all().map { it.toDto() }
    }

    override suspend fun findUserById(id: Int): UserDTO = transaction {
        UserEntity.findById(id)!!.toDto()
    }

    override suspend fun addNewUser(newUser: UserRegisterDTO): UserDTO? {
        return try {
            transaction {
                UserEntity.new {
                    username = newUser.username
                    password = hashString(newUser.password)
                }.toDto()
            }
        } catch (_: ExposedSQLException) {
            null
        }
    }

    override suspend fun editUser(user: UserDTO): Boolean = transaction {
        Users.update({ Users.id eq user.id }) {
            it[username] = user.username
        } > 0
    }

    override suspend fun save(username: String, user: SaveDTO): Boolean = transaction {
        Users.update({ Users.username eq username }) {
            it[balance] = user.balance
            it[unlockedStocks] = user.unlockedStocks
            it[unlockedRoulette] = user.unlockedRoulette
        } > 0
    }

    override suspend fun findUserByName(name: String): UserDTO? = transaction {
        val resultRow = Users.select { Users.username eq name }.singleOrNull()
        resultRow?.let {
            UserDTO(
                it[Users.id].value, it[Users.username], it[Users.password], it[Users.balance], it[Users.unlockedStocks], it[Users.unlockedRoulette]
            )
        }
    }

    private fun hashString(input: String): String {
        val bytes = MessageDigest.getInstance("SHA-256").digest(input.toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }
    }
}