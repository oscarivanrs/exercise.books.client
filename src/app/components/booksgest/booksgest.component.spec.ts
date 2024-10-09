import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksgestComponent } from './booksgest.component';

describe('BooksgestComponent', () => {
  let component: BooksgestComponent;
  let fixture: ComponentFixture<BooksgestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksgestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksgestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
