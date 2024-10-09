import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BooksComponent } from './components/books/books.component';
import { BooksgestComponent } from './components/booksgest/booksgest.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [authGuard], children: [
    {path: ':books', component: BooksComponent},
    {path: ':booksgest', component: BooksgestComponent}
  ]},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
