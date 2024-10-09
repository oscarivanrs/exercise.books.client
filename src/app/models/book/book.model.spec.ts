import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModel } from './book.model';

describe('BookModel', () => {
  let component: BookModel;
  let fixture: ComponentFixture<BookModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
