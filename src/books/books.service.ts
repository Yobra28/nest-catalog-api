/* eslint-disable prettier/prettier */
 
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
 
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DatabaseService } from 'src/Database/connection.service';
import { Books } from './interfaces/books.interfaces';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto): Promise<Books> {
  const ifbookisbnexist = await this.databaseService.query(
    `SELECT * FROM Books WHERE isbn = $1`,
    [createBookDto.ISBN],
  );

  if (ifbookisbnexist.rows && ifbookisbnexist.rows.length > 0) {
    throw new ConflictException(`Book with ISBN ${createBookDto.ISBN} already exists`);
  }

  try {
    const result = await this.databaseService.query(
      `SELECT * FROM create_book($1, $2, $3, $4)`,
      [
        createBookDto.title,
        createBookDto.author,
        createBookDto.publicationYear,
        createBookDto.ISBN,
      ],
    );

    console.log('DB result:', result.rows);

    if (!result.rows || result.rows.length === 0) {
      throw new InternalServerErrorException('No data returned from create_book function');
    }

    return this.mapRowToBooks(result.rows[0]);
  } catch (error: any) {
    console.error('Database error stack:', error.stack || error);
    if (error.message && error.message.includes('already exists')) {
      throw new ConflictException(error.message);
    }
    throw new InternalServerErrorException(error.message || 'Failed to create book');
  }
}
  mapRowToBooks(row: any): Books {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    publication_year: row.publication_year,  
    ISBN: row.isbn,
  };
}



  async findAll(): Promise<Books[]> {
    const result = await this.databaseService.query('SELECT * FROM get_all_books()', []);
    if (!result || !result.rows) {
      throw new InternalServerErrorException('Failed to retrieve books');
    }
    return result.rows;
  }

  async findOne(id: number): Promise<Books> {
    const result = await this.databaseService.query('SELECT * FROM get_book_by_id($1)', [id]);
    if (!result || !result.rows || result.rows.length === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return result.rows[0];
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Books> {
  try {
    const result = await this.databaseService.query(
      `SELECT * FROM update_book($1, $2, $3, $4, $5)`,
      [
        id,
        updateBookDto.title,
        updateBookDto.author,
        updateBookDto.publicationYear,
        updateBookDto.ISBN,
      ],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(error.message || `Failed to update book ${id}`);
  }
}




  async softDelete(id: number): Promise<void> {
  try {
    await this.databaseService.query(`SELECT soft_delete_book($1)`, [id]);
  } catch (error) {
    console.error('Soft delete error:', error);
    throw new InternalServerErrorException(`Failed to soft delete book ${id}`);
  }
}

async hardDelete(id: number): Promise<void> {
  try {
    const result = await this.databaseService.query(
      `DELETE FROM Books WHERE id = $1`,
      [id],
    );
    if (result.rowCount === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  } catch (error) {
    console.error('Database error:', error);
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(`Failed to delete book ${id}`);
  }
}



  async countByYear(year: number) {
    const result = await this.databaseService.query('SELECT count_books_by_year($1)', [year]);
    const count = result.rows[0].count_books_by_year;
    if (count === 0) {
      throw new NotFoundException(`No books found for year ${year}`);
    }
    return { year, count };
}
}
