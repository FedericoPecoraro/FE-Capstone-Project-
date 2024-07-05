import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  constructor(
    private authSvc:UserService,
    private router:Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      if(!this.authSvc.syncIsLoggedIn){
        this.router.navigate(['/user/login'])
      }

      return this.authSvc.syncIsLoggedIn
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state)
  }

}
