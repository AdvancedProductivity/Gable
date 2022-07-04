import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, CanLoad, Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate, CanActivateChild, CanLoad {
  token: string;

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    console.log('zzq see url canActivate', url);
    if (this.token) {
      if (url === 'login') {
        return false;
      } else {
        return true;
      }
    } else if (url === 'login') {
      return true;
    }
    return this.router.parseUrl('/login');
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    console.log('zzq see url canActivateChild', url);
    if (this.token) {
      if (url === 'login') {
        return false;
      } else {
        return true;
      }
    } else if (url === 'login') {
      return true;
    }
    return this.router.parseUrl('/login');
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('zzq see');
    return true;
  }

}
