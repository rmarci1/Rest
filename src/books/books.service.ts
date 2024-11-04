import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  books = [
    {
      id: 1,
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      isbn: "9781593279509",
      publishYear: 2018,
      reserved: false
    },
    {
      id: 2,
      title: "You Don’t Know JS",
      author: "Kyle Simpson",
      isbn: "9781491904244",
      publishYear: 2015,
      reserved: true
    },
    {
      id: 3,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      publishYear: 2008,
      reserved: false
    }
  ];
  nextId = 4;
  create(createBookDto: CreateBookDto) {
    const newBook = {
      id: this.nextId++,
      reserved: false,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.findOne(id);
    Object.assign(book, updateBookDto);
    return book;
  }

  remove(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
  }

}
