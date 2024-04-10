package de.tommus.plugins

import de.tommus.model.SaveDTO
import de.tommus.model.UpgradeDTO
import de.tommus.model.UserDTO
import de.tommus.services.`interface`.UpgradeServiceInterface
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
    val upgradeService: UpgradeServiceInterface by closestDI().instance()

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
                } else {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }
        }
    }

    routing {
        authenticate("auth-basic") {
            get("/upgrade/getUpgrade") {
                val username = call.principal<UserIdPrincipal>()?.name!!
                val response = upgradeService.getUpgrades(username)
                if (response != null) {
                    call.respond(response)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }

    routing {
        authenticate("auth-basic") {
            post("/upgrade/update") {
                val upgradeDTO = call.receive<UpgradeDTO>()
                val response = upgradeService.updateUpgrades(upgradeDTO)
                if (response) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    call.respond(HttpStatusCode.NotFound)
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
                upgradeService.createUpgrades(user.username)
                call.respond(response)
            } else {
                call.respond(HttpStatusCode.BadRequest)
            }
        }
    }

    routing {
        post("/user/save") {
            val dto = call.receive<SaveDTO>()
            val username = dto.username
            val userResponse = userService.save(username, dto.balance)
            val upgradeResponse = upgradeService.updateUpgrades(
                UpgradeDTO(
                    username,
                    dto.click1upgrade,
                    dto.click2upgrade,
                    dto.click3upgrade,
                    dto.click4upgrade,
                    dto.click5upgrade,
                    dto.income1upgrade,
                    dto.income2upgrade,
                    dto.income3upgrade,
                    dto.income4upgrade,
                    dto.income5upgrade
                )
            )
            if (userResponse && upgradeResponse) {
                call.respond(HttpStatusCode.OK)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}
