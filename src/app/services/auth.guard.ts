import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router,CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isCustomer = localStorage.getItem('customerId');
      console.log(isCustomer)
      if(isCustomer){
        return true;
      }else{
        window.alert("Kindly Login !");
        this.router.navigateByUrl('customer');
        return false;
      }
  }
  
}
