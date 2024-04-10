package de.tommus.plugins

import de.tommus.model.UpgradeEntity
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
                    username = "TommusZerstoerus"
                    password = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
                }
                UserEntity.new {
                    username = "ToniTester01"
                    password = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
                }
                UserEntity.new {
                    username = "admin"
                    password = "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
                }
            }
            SchemaUtils.create(Upgrades)
            if(UpgradeEntity.all().empty()) {
                UpgradeEntity.new {
                    username = "TommusZerstoerus"
                    click1upgrade = 1
                    click2upgrade = 1
                    click3upgrade = 1
                    click4upgrade = 1
                    click5upgrade = 1
                    income1upgrade = 1
                    income2upgrade = 1
                    income3upgrade = 1
                    income4upgrade = 1
                    income5upgrade = 1
                }
                UpgradeEntity.new {
                    username = "ToniTester01"
                    click1upgrade = 1
                    click2upgrade = 1
                    click3upgrade = 1
                    click4upgrade = 1
                    click5upgrade = 1
                    income1upgrade = 1
                    income2upgrade = 1
                    income3upgrade = 1
                    income4upgrade = 1
                    income5upgrade = 1
                }
                UpgradeEntity.new {
                    username = "admin"
                    click1upgrade = 1
                    click2upgrade = 2
                    click3upgrade = 3
                    click4upgrade = 4
                    click5upgrade = 5
                    income1upgrade = 1
                    income2upgrade = 2
                    income3upgrade = 3
                    income4upgrade = 4
                    income5upgrade = 5
                }
            }
        }
    }
}