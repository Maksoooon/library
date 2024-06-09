import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { BookService } from "./book.service";
import { BookDto } from "src/dto/book.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import removeSpaces from "src/utils/removeSpaces";
import { createReadStream } from "fs";
import { join } from "path";
import { Response } from "express";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post("create")
  @UseInterceptors(
    FilesInterceptor("file", 2, {
      dest: "./books",
      storage: diskStorage({
        destination: "./books",
        filename: function (req, file, cb) {
          file.originalname = uuid()
            .concat(".")
            .concat(removeSpaces(file.originalname));
          cb(null, file.originalname);
        },
      }),
    })
  )
  createBook(@Body() body: any, @Request() req) {
    console.log('tete')
    return this.bookService.createBook(body, req.files[0], req.files[1]);
  }

  @Get("all")
  getBooks() {
    return this.bookService.getBooks();
  }

  @Get(":id/")
  getBook(@Query("id") id: string) {
    console.log('3');
    return this.bookService.getBook(id);
  }

  @Post("get")
  async getBookFile(@Body() body: any, @Res() res: Response) {
    console.log('4');
    const file = await createReadStream(join(process.cwd(), `./books/${body.name}`));
    file.pipe(res);
  }
}
