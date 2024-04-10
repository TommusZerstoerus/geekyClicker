package de.tommus.model

import kotlinx.serialization.Serializable

@Serializable
data class SaveDTO(
    val username: String,
    val click1upgrade: Int,
    val click2upgrade: Int,
    val click3upgrade: Int,
    val click4upgrade: Int,
    val click5upgrade: Int,
    val income1upgrade: Int,
    val income2upgrade: Int,
    val income3upgrade: Int,
    val income4upgrade: Int,
    val income5upgrade: Int,
    val balance: Int
)