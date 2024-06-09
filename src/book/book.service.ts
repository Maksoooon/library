import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  async createBook(body, file, link) {
    const book = new Book();
    book.book_author = body.book_author;
    book.book_name = body.book_name;
    book.book_year = body.book_year;
    book.image = file.originalname || null;
    book.book_link = link;
    await book.save();
    return {
      book
    }
  }

  async getBooks(){
    const books = await Book.find();
    return {
      books
    }
  }

  async getBook(id: string){
    const book = await Book.findOne({
      where: {
        bookId: id
      }
    });
    return {
      book
    }
  }
}
