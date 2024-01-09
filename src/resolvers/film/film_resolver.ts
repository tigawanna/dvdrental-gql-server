import { Film } from "@/entities/film.entity";
import { AppDataSource } from "@/typeorm";
import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { MoreThan } from "typeorm";

const filmRepository = AppDataSource.getRepository(Film)

@ObjectType()
export class PaginatedFilms {
    @Field(() => [Film])
    films: Film[]
    @Field(()=>Boolean)
    hasMore: boolean
    @Field(()=>Int)
    cursor: number
    @Field(()=>Int)
    total: number
}


@Resolver()
export class FilmResolver {
    @Query(() => [Film])
    async allFilms(): Promise<Film[]> {
        const films = await filmRepository.find()
        return films
    }

    @Query(() => PaginatedFilms)
    async filmList(
        @Arg("cursor", () => Int) cursor:number,
        @Arg("limit", () => Int, {nullable: true}) limit:number
        ): Promise<PaginatedFilms> {
        const realLimit = Math.min(100, limit)
        const realLimitPlusOne = realLimit + 1

        // console.log("limit",limit)
        // console.log("realLimit",realLimit)
        // console.log("realLimit",realLimit)
        // console.log("realLimitPlusOne",realLimitPlusOne)

        const totalFilms = await filmRepository.count()
        const films = await filmRepository.find({
            take: realLimitPlusOne,
            order:{film_id: "ASC"},
            where: {
                film_id: MoreThan(cursor)
            }
        })
        const filmsWithCursor = films.slice(0, -1)
        return {
            films: filmsWithCursor,
            hasMore: films.length === realLimitPlusOne,
            total: totalFilms,
            cursor: (filmsWithCursor[filmsWithCursor.length-1].film_id)
        }

    }


    @Query(() => Film)
    async film(
    @Arg("id", () => Int)id:number
    ): Promise<Film|null> {
        const film = await filmRepository.findOneBy({film_id: id})
        return film
    }

}


