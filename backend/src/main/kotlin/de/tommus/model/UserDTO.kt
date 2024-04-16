package de.tommus.model

import kotlinx.serialization.Serializable

@Serializable
data class UserDTO(
    val id: Int? = null, val username: String, val password: String, val balance: Long, val unlockedStocks: Boolean, val unlockedRoulette: Boolean
)