import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Constants } from '../util/constants';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['authentication/login']);
    return false;
  }
};
