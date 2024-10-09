import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.model.html',
  styleUrl: './book.model.css'
})
export class BookModel {
  constructor(@Inject('id') private id: number, @Inject('title') public title: string, @Inject('author') public author: string) {}

  getId() {
    return this.id;
  }
}
