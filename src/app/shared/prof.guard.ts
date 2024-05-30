import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const profGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isProf()
      .then(prof => {
          if (prof) {
            console.log("GUARD: Navigation autorisée");
            return true;
          } else {
            console.log("GUARD: Navigation NON autorisée");
            router.navigate(['/home']);
            return false;
          }
        }
      );
  };