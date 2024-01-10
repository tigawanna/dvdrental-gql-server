import { Film, FilmInput } from "@/entities/film.entity";
import { AppDataSource } from "@/typeorm";
import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Column, InsertResult, MoreThan, PrimaryGeneratedColumn, UpdateResult } from "typeorm";

const filmRepository = AppDataSource.getRepository(Film);

@ObjectType()
export class PaginatedFilms {
  @Field(() => [Film])
  films: Film[];
  @Field(() => Boolean)
  hasMore: boolean;
  @Field(() => Int)
  cursor: number;
  @Field(() => Int)
  total: number;
}

// @InputType()
// class FilmInput {
//     @Field(() => Int)
//     @PrimaryGeneratedColumn()
//     film_id: number;

//     @Field(() => String)
//     @Column({ type: "text" })
//     title: string;

//     @Field(() => Int)
//     @Column({ type: "integer" })
//     release_year: number;
// }

@Resolver()
export class FilmResolver {
  //  get all items
  @Query(() => [Film])
  async allFilms(): Promise<Film[]> {
    const films = await filmRepository.find();
    return films;
  }

  // get a paginated list
  @Query(() => PaginatedFilms)
  async filmList(
    @Arg("cursor", () => Int) cursor: number,
    @Arg("limit", () => Int, { nullable: true }) limit: number
  ): Promise<PaginatedFilms> {
    const realLimit = Math.min(100, limit);
    const realLimitPlusOne = realLimit + 1;
    const totalFilms = await filmRepository.count();
    const films = await filmRepository.find({
      take: realLimitPlusOne,
      order: { film_id: "ASC" },
      where: {
        film_id: MoreThan(cursor),
      },
    });
    const filmsWithCursor = films.slice(0, -1);
    return {
      films: filmsWithCursor,
      hasMore: films.length === realLimitPlusOne,
      total: totalFilms,
      cursor: filmsWithCursor[filmsWithCursor.length - 1].film_id,
    };
  }

  // get film by id
  @Query(() => Film)
  async film(@Arg("id", () => Int) id: number): Promise<Film | null> {
    const film = await filmRepository.findOneBy({ film_id: id });
    return film;
  }

// add film
@Mutation(() => Film)
async addFilm(@Arg("film",()=>FilmInput) film: Film): Promise<Film> {
  return await filmRepository.save(film);
}

// // update film
// @Mutation(() => Film)
// async upsertFilm(@Arg('film', () => Film) film: Film): Promise<InsertResult> {
//   const upserted =await filmRepository.upsert(film, ["film_id"]);
//   return upserted
// }

// // update film
// @Mutation(() => Film)
// async updateFilm(@Arg('film', () => Film) film: Film): Promise<UpdateResult> {
//   const updated =await filmRepository.update(film.film_id, film);
//   return updated
// }

// delete film

@Mutation(() => Boolean)
async deleteFilm(@Arg('id', () => Int) id: number): Promise<boolean> {
  try {
    await filmRepository.delete(id);
    return true;
  } catch (error) {
    return false;
  }
}
}
