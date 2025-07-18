import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { DatabaseService } from 'src/Database/connection.service';
import { BooksController } from './books.controller';
@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService, DatabaseService],
})
export class BooksModule {}
