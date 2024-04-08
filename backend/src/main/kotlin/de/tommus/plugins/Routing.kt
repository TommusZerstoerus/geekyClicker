package de.tommus.plugins

import de.tommus.model.UserDTO
import de.tommus.services.`interface`.UserServiceInterface
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.kodein.di.instance
import org.kodein.di.ktor.closestDI

fun Application.configureRouting() {

    val userService: UserServiceInterface by closestDI().instance()
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
    }

    routing {
        authenticate("auth-basic") {
            post("/user/login") {
                val user = call.principal<UserIdPrincipal>()?.name?.let { name -> userService.findUserByName(name) }
                if (user != null) {
                    call.respond(user)
                }
            }
        }
    }

    routing {
        post("/user/logout") {
            call.respond(HttpStatusCode.Unauthorized)
        }
    }

    routing {
        post("/user/register") {
            val user = call.receive<UserDTO>()
            val response = userService.addNewUser(user)
            if (response != null) {
                call.respond(response)
            } else {
                call.respondText("Nutzer konnte nicht angelegt werden")
            }
        }
    }
}
