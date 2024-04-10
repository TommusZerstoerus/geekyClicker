package de.tommus.model

import kotlinx.serialization.Serializable

@Serializable
data class UpgradeDTO(val id: Int, val userID: Int, val upgradeID: Int, val level: Int)