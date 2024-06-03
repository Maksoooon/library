import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    TypeOrmModule.forFeature([Book])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
