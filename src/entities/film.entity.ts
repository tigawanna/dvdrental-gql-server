import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { registerEnumType } from "type-graphql";



enum FilmRatings{
PG13 = "PG-13",
    NC17 = "NC-17",
    R = "R",
    G = "G",
    PG = "PG"
}


registerEnumType(FilmRatings, {
    name: "rating", // Mandatory
    description: "The film rating", // Optional
});

@ObjectType()
@InputType()
@Entity()
export class Film {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    film_id: number;

    @Field(()=>String)
    @Column({ type: "text" })
    title: string;

    @Field(() => Int)
    @Column({ type: "integer" })
    release_year: number;

    @Field(() => Int)
    @Column({ type: "smallint" })
    language_id: number;

    @Field(() => Int)
    @Column({ type: "smallint" })
    rental_duration: number;

    @Field(() => Int)
    @Column({ type: "numeric" })
    rental_rate: number;

    @Field(() => Int)
    @Column({ type: "smallint" })
    length: number;

    @Field(() => Int)
    @Column({ type: "numeric" })
    replacement_cost: number;

    @Field(()=>FilmRatings)
    @Column({ type: "enum",enumName: "rating" })
    rating: FilmRatings

    @Field(() => String)
    @Column({ type: "timestamp without time zone" })
    last_update: Date;

    @Field(() => [String])
    @Column({ type: "text", array: true })
    special_features: string[];

    @Field(()=>String)
    @Column({ type: "text" })
    fulltext: string;

}



@InputType()
export class FilmInput {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    film_id: number;

    @Field(() => String)
    @Column({ type: "text" })
    title: string;

    @Field(() => Int)
    @Column({ type: "integer" })
    release_year: number;

    @Field(() => Int)
    @Column({ type: "smallint" })
    language_id: number;

    @Field(() => Int)
    @Column({ type: "smallint" })
    rental_duration: number;

    @Field(() => Int)
    @Column({ type: "numeric" })
    rental_rate: number;

    @Field(() => Int)
    @Column({ type: "smallint" })
    length: number;

    @Field(() => Int)
    @Column({ type: "numeric" })
    replacement_cost: number;
    
    
    @Field(() => FilmRatings)
    @Column({ type: "enum", enumName: "rating" })
    rating: FilmRatings

    @Field(() => String)
    @Column({ type: "timestamp without time zone" })
    last_update: Date;

    @Field(() => [String])
    @Column({ type: "text", array: true })
    special_features: string[];

    @Field(() => String)
    @Column({ type: "text" })
    fulltext: string;

}


// const new_film:FilmInput ={
// "film_id":1001,
// "title":'test',
// "release_year":2000,
// "language_id":1,
// "rental_duration":1,
// "rental_rate":1,
// "length":1,
// "replacement_cost":1,
// "rating":'test',
// "last_update":"12/12/2022",
// "special_features":['test'],
// "fulltext":'test'
// }
