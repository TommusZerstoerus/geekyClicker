package de.tommus.plugins

import de.tommus.services.impl.UpgradeService
import de.tommus.services.impl.UserService
import de.tommus.services.`interface`.UpgradeServiceInterface
import de.tommus.services.`interface`.UserServiceInterface
import io.ktor.server.application.*
import org.kodein.di.bindSingleton
import org.kodein.di.ktor.di

fun Application.configureDI () {
    di {
        bindSingleton<UserServiceInterface> { UserService() }
        bindSingleton<UpgradeServiceInterface> { UpgradeService() }
    }
}