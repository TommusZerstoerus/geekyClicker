package de.tommus.plugins

import de.tommus.services.`interface`.UserServiceInterface
import io.ktor.server.application.*
import io.ktor.server.auth.*
import org.kodein.di.instance
import org.kodein.di.ktor.closestDI
import java.security.MessageDigest

fun Application.configureSecurity() {
    val userService: UserServiceInterface by closestDI().instance()
    install(Authentication) {
        basic("auth-basic") {
            validate { credentials ->
                val hashPassword = hashString(credentials.password)
                val user = userService.findUserByName(credentials.name)
                if (user != null && credentials.name == user.username && hashPassword == user.password) {
                    UserIdPrincipal(credentials.name)
                } else {
                    null
                }
            }
        }
    }
}

fun hashString(input: String): String {
    val bytes = MessageDigest.getInstance("SHA-256").digest(input.toByteArray())
    return bytes.joinToString("") { "%02x".format(it) }
}