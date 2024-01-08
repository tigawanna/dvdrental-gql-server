import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ObjectType, Field, Int } from 'type-graphql'




@ObjectType()
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

    @Field(()=>String)
    @Column({ type: "text" })
    rating: string;

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
