package de.tommus.services.impl

import de.tommus.model.SaveDTO
import de.tommus.model.UserDTO
import de.tommus.model.UserEntity
import de.tommus.model.Users
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

    override suspend fun addNewUser(newUser: UserDTO): UserDTO? {
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

    override suspend fun save(username: String, newBalance: Int): Boolean = transaction {
        Users.update({ Users.username eq username }) {
            it[balance] = newBalance
        } > 0
    }

    override suspend fun findUserByName(name: String): UserDTO? = transaction {
        val resultRow = Users.select { Users.username eq name }.singleOrNull()
        resultRow?.let {
            UserDTO(
                it[Users.id].value, it[Users.username], it[Users.password], it[Users.balance]
            )
        }
    }

    private fun hashString(input: String): String {
        val bytes = MessageDigest.getInstance("SHA-256").digest(input.toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }
    }
}