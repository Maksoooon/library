import { Trim } from "class-sanitizer";

export class BookDto {
    public readonly book_name: string;

    public readonly book_author: string;

    @Trim()
    public readonly book_year: number;

    public readonly file: Express.Multer.File;
}
