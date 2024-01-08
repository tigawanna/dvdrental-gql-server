import { Film } from "@/entities/film.entity";
import { AppDataSource } from "@/typeorm";
import { Arg, Int, Query, Resolver } from "type-graphql";

const filmRepository = AppDataSource.getRepository(Film)
@Resolver()
export class FilmResolver {
    @Query(() => [Film])
    async films(): Promise<Film[]> {
        const films = await filmRepository.find()
        return films
    }
    @Query(() => Film)

    async film(
        @Arg("id", () => Int)id:number
    ): Promise<Film|null> {
        const film = await filmRepository.findOneBy({film_id: id})
        return film
    }

}
