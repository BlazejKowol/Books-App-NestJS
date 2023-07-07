import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll(): any {
    return this.booksService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.getById(id);
    if (!book) throw new NotFoundException('404 not found');
    return book;
  }

  @Post('/')
  create(@Body() authorData: CreateBookDTO) {
    return this.booksService.create(authorData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() authorData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('400 Bad Request');

    await this.booksService.updateById(id, authorData);
    return { success: true };
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('404 not found');

    await this.booksService.deleteById(id);
    return { success: true };
  }
}
