import { Film } from "@/entities/film.entity";
import { AppDataSource } from "@/typeorm";
import { Query, Resolver } from "type-graphql";

const filmRepository = AppDataSource.getRepository(Film)
@Resolver()
export class FilmResolver {
    @Query(() => [Film])
    async films(): Promise<Film[]> {
        const films = await filmRepository.find()
        return films
    }

}
