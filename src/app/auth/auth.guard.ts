import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const logged = (inject(AuthService)).isLogged();
  if(!logged) {
    inject(Router).navigate(['/signin']);
  }
  return logged;
};
