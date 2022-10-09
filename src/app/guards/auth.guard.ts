import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

Router
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router:Router){}

  canActivate():boolean{
    if(localStorage.getItem("Token")){
       return true;
    }
    else{
       this._Router.navigate(['/register'])
       return false;
    }
  }
}
