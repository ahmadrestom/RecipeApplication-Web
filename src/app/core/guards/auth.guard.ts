import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedIn = !!localStorage.getItem('auth_token');
  return loggedIn ? true : inject(Router).createUrlTree(['/auth'], {queryParams: {mode:'login'}});
};

