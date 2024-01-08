import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    year: string;

    @Column({ type: "text" })
    runtime: string;

    @Column({ type: "text", array: true })
    genres: string[];

    @Column({ type: "text" })
    director: string;

    @Column({ type: "text", array: true })
    actors: string[];

    @Column({ type: "text" })
    plot: string;

    @Column({ type: "text" })
    posterUrl: string;

}
