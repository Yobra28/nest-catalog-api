/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
import { Books } from './interfaces/books.interfaces';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { ApiResponse } from 'src/Api-Response/api-response.interface';

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
@Post()
async create(@Body() createBookDto: CreateBookDto): Promise<ApiResponse<Books>> {
  try {
    const book = await this.booksService.create(createBookDto);
    return {
      success: true,
      message: 'Book created successfully',
      book: book,
    };
  } catch (error) {
    throw error;  
  }
}



  @Get()
  async findAll(): Promise<ApiResponse<Books[]>> {
    try {
      const books = await this.booksService.findAll();
      return {
        success: true,
        message: `Retrieved ${books.length} books`,
      book: books,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve books',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
    
  }

  @Get(':id')
   async findOne(@Param('id') id: number): Promise<ApiResponse<Books>> {
    try {
        const book = await this.booksService.findOne(id);
        return{
            success: true,
            message: `Book with ID ${id} retrieved successfully`,
            book: book,
        }
    } catch (error) {
        return {
            success: false,
            message: `Failed to retrieve book with ID ${id}`,
            error: error instanceof Error ? error.message : 'Unknown Error',
        };
    }
  }

 @Put(':id')
async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<ApiResponse<Books>> {
  try {
    const book = await this.booksService.update(id, updateBookDto);
    return {
      success: true,
      message: `Book with ID ${id} updated successfully`,
      book: book,  
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update book with ID ${id}`,
      error: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
}



@Delete('soft/:id')
async softDelete(@Param('id') id: number): Promise<ApiResponse<Books>> {
  try {
    return {
      success: true,
      message: `Book with ID ${id} soft deleted successfully`,
      book: undefined, 
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to soft delete book with ID ${id}`,
      error: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
}


@Delete(':id')
async hardDelete(@Param('id') id: number): Promise<ApiResponse<null>> {
  try {
    await this.booksService.hardDelete(id);
    return {
      success: true,
      message: `Book with ID ${id} deleted permanently`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to delete book with ID ${id}`,
      error: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
}


 

  @Get('count/:year')
  async countByYear(@Param('year') year: number): Promise<ApiResponse<{ year: number; count: number }>> {
    try {
      const result = await this.booksService.countByYear(year);
      return {
        success: true,
        message: `Count of books for year ${year}`,
        book: result,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to count books for year ${year}`,
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }
}