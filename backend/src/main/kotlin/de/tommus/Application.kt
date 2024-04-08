package de.tommus

import de.tommus.plugins.*
import io.github.smiley4.ktorswaggerui.SwaggerUI
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8000, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureSecurity()
    configureHTTP()
    configureDI()
    configureSerialization()
    DatabaseService().init()
    configureRouting()

    install(SwaggerUI) {
        swagger {
            swaggerUrl = "swagger-ui"
            forwardRoot = true
        }
        info {
            title = "Wishlist API"
            version = "1.0.187"
            description = "API für die Verwaltung von Wünschen."
        }
        server {
            url = "http://localhost:8000"
            description = "Toms Server"
        }
    }
}
