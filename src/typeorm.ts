// import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "dvdrental",
    synchronize: false,
    migrations: ["src/migrations"],
    entities:["src/entities/*.entity.ts"],
})
