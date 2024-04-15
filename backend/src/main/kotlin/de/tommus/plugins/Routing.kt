package de.tommus.plugins

import de.tommus.model.SaveDTO
import de.tommus.model.UpgradeDTO
import de.tommus.model.UserDTO
import de.tommus.model.UserRegisterDTO
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
                val user = userService.findUserByName(username) ?: return@get call.respond(HttpStatusCode.NotFound)

                val response = upgradeService.getUpgrades(user.id!!)

                call.respond(response)
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
            val user = call.receive<UserRegisterDTO>()
            val response = userService.addNewUser(user)
            if (response != null) {
                call.respond(response)
            } else {
                call.respond(HttpStatusCode.BadRequest)
            }
        }
    }

    routing {
        authenticate("auth-basic") {
            post("/user/save") {
                val dto = call.receive<SaveDTO>()
                val username = dto.username
                val userResponse = userService.save(username, dto.balance, dto.boughtStocks)

                if (!userResponse) {
                    call.respond(HttpStatusCode.NotFound)
                    return@post
                }

                val user = userService.findUserByName(username) ?: return@post call.respond(HttpStatusCode.NotFound)

                val userID = user.id ?: return@post call.respond(HttpStatusCode.NotFound)
                val oldUpgrades = upgradeService.getUpgrades(userID)

                dto.upgrades.forEach { newUpgrade ->

                    val oldUpgrade = oldUpgrades.find {
                        it.upgradeID == newUpgrade.upgradeID
                    }
                    // upgrade exists -> update old entry
                    if (oldUpgrade != null) {
                        upgradeService.updateUpgrades(
                            UpgradeDTO(
                                oldUpgrade.id, userID, newUpgrade.upgradeID, newUpgrade.level
                            )
                        )
                    } else {
                        upgradeService.createUpgrades(userID, newUpgrade.upgradeID, newUpgrade.level)
                    }
                }
                call.respond(HttpStatusCode.OK)
            }
        }
    }
}

