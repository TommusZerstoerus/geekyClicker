package de.tommus.model

import kotlinx.serialization.Serializable

@Serializable
data class UserRegisterDTO(
    val username: String, val password: String
)
