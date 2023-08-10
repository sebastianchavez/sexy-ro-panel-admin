import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = localStorage.getItem('currentUser');
    if(isLogin){
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false
    }
  }
  
}
