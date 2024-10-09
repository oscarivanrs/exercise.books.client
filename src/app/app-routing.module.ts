import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BooksComponent } from './components/books/books.component';
import { BooksgestComponent } from './components/booksgest/booksgest.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin/signup', redirectTo: "signup"},
  {path: '', component: DashboardComponent, canActivate: [authGuard], children: [
    {path: '', redirectTo: "books", pathMatch: "full"},
    {path: 'books', component: BooksComponent},
    {path: 'booksgest', component: BooksgestComponent},
    {path: 'profile', component: ProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
