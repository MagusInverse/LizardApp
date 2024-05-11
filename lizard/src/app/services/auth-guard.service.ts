import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router, private mainService: MainServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.mainService.accessToken !== '';

    if (isLogged) {
      return true;
    }

    // this.router.navigate(['./login']);
    // return false;
    return true
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(next, state);
}
