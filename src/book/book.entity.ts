import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("book")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    bookId: string;

    @Column({ type: 'varchar'})
    book_name: string;

    @Column({ type: 'varchar'})
    book_author: string;

    @Column({ type: 'int64'})
    book_year: number;

    @Column("text", {nullable: true})
    image?: string;
}