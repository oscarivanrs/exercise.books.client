import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookModel } from '../../models/book/book.model';
import { BooksService } from '../../services/books.service';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

let BOOKS_DATA: BookModel[] = [];

@Component({
  selector: 'app-booksgest',
  templateUrl: './booksgest.component.html',
  styleUrl: './booksgest.component.css'
})
export class BooksgestComponent {
  newBookForm!: FormGroup;

  displayedColumns: string[] = ['id', 'title', 'author','delete'];
  dataSource = new MatTableDataSource(BOOKS_DATA);
  
  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.newBookForm = new FormGroup({
     title: new FormControl(null, Validators.required),
     author: new FormControl(null, Validators.required),
    });
    this.bookService.listBooks().subscribe((data)=>{
      BOOKS_DATA.push(...data);
      this.updateDS();
    });
   }

   updateDS(): void {
    this.dataSource = new MatTableDataSource(BOOKS_DATA);
   }
 
   onSubmit() {
    if(!this.existBookByTitleAndAuthor(this.newBookForm.value.title, this.newBookForm.value.author)) {
      const id = this.findFirstFreeId();
      const nBook = new BookModel(id, this.newBookForm.value.title, this.newBookForm.value.author);
      this.bookService.addBook(nBook).subscribe({
        next: (book) => {
          this.openDialog(DialogSuccessActionBook, {
            data: { action: "Add" }
          });
          this.newBookForm.reset();
          BOOKS_DATA.push(book);
          this.updateDS();
        },
        error: (error) => {
          console.error('There was an error!', error.message);
          this.openDialog(DialogFailActionBook, {
            data: { action: "Add" }
          });
        }
      });
    } else {
      console.error('Book already exist!');
          this.openDialog(DialogFailActionBook, {
            data: { action: "Add" }
          });
    }
   }

   deleteBook(index: number): void {
    const book = this.findBookById(index);
    this.bookService.delBook(book).subscribe({
      next: (data) => {
        if(data) {
          BOOKS_DATA.splice(BOOKS_DATA.indexOf(book), 1);
          this.updateDS();
        } else {
          this.openDialog(DialogFailActionBook, {
            data: { action: "Del" }
          });
        }
      },
      error: (error) => {
        console.log('There was an error!', error.message);
        this.openDialog(DialogFailActionBook, {
          data: { action: "Del" }
        });
      },
    });
   }

   findFirstFreeId(): number {
    const usedIds = new Set(BOOKS_DATA.map(book => book.id));
    let id = 1;
    while (usedIds.has(id)) {
      id++;
    }
    return id;
  }

  existBookByTitleAndAuthor(title: string, author: string): boolean {
    const bookMap = new Map(BOOKS_DATA.map(book => [`${book.title}-${book.author}`, book]));
    return (bookMap.get(`${title}-${author}`) != null);
  }

  findBookById(id: number): BookModel {
    const books = new Map(BOOKS_DATA.map(book => [book.id, book]));
    return books.get(id)!;
  }

  dialog = inject(MatDialog);

  openDialog(dialog: any, action: any) {
   this.dialog.open(dialog, action);
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}

@Component({
  selector: 'DialogSuccessActionBook',
  templateUrl: './DialogSuccessActionBook.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSuccessActionBook {
  @Input() action: string = '';
}

@Component({
  selector: 'DialogFailActionBook',
  templateUrl: './DialogFailActionBook.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFailActionBook {
  @Input() action: string = '';
}