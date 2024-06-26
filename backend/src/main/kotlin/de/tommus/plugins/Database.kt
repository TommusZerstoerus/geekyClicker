package de.tommus.plugins

import de.tommus.model.Upgrades
import de.tommus.model.UserEntity
import de.tommus.model.Users
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction


class DatabaseService() {
    fun init() {
        val driverClassName = "org.postgresql.Driver"
        val jdbcURL = "jdbc:postgresql://db:5432/postgres"
        val database =
            Database.connect(url = jdbcURL, driver = driverClassName, user = "postgres", password = "postgres")
        transaction(database) {
            SchemaUtils.create(Users)
            if (UserEntity.all().empty()) {
                UserEntity.new {
                    username = "admin"
                    password = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
                }
            }
            SchemaUtils.create(Upgrades)
        }
    }
}