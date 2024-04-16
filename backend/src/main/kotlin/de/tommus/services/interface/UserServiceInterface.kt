package de.tommus.services.`interface`

import de.tommus.model.SaveDTO
import de.tommus.model.UserDTO
import de.tommus.model.UserRegisterDTO

interface UserServiceInterface {
    suspend fun allUser(): List<UserDTO>
    suspend fun findUserById(id: Int): UserDTO?
    suspend fun addNewUser(user: UserRegisterDTO): UserDTO?
    suspend fun findUserByName(name: String): UserDTO?
    suspend fun editUser(user: UserDTO): Boolean
    suspend fun save(username: String, user: SaveDTO): Boolean
}