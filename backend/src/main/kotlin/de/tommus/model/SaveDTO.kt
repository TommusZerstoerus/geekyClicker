package de.tommus.model

import kotlinx.serialization.Serializable

@Serializable
data class SavedUpgrade(val upgradeID: Int, val level: Int)


@Serializable
data class SaveDTO(
    val username: String,
    val upgrades: List<SavedUpgrade>,
    val balance: Long,
    val unlockedStocks: Boolean,
    val unlockedRoulette: Boolean
)