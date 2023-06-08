import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface AuthResponse{
    ok: boolean;
    uid?: string;
    name?: string;
    token?: string;
    msg?: string;
}

export interface Usuario{
    uid: string;
    name: string;
}

export interface CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  }

export interface CanLoad {
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  }