import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BookModel } from '../../models/book/book.model';
import { BooksService } from '../../services/books.service';

let BOOKS_DATA: BookModel[] = [];

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  displayedColumns: string[] = ['id', 'title', 'author'];
  dataSource = new MatTableDataSource(BOOKS_DATA);

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.bookService.listBooks().subscribe((data)=>{
      BOOKS_DATA.push(...data);
      this.dataSource = new MatTableDataSource(BOOKS_DATA);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
