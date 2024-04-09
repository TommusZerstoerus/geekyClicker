package de.tommus.services.`interface`

import de.tommus.model.SaveDTO
import de.tommus.model.UserDTO

interface UserServiceInterface {
    suspend fun allUser(): List<UserDTO>
    suspend fun findUserById(id: Int): UserDTO?
    suspend fun addNewUser(user: UserDTO): UserDTO?
    suspend fun findUserByName(name: String): UserDTO?
    suspend fun editUser(user: UserDTO): Boolean
    suspend fun save(username: String, balance: Int): Boolean
}