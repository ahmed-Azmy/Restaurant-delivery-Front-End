import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(private _Location:Location){}

  canActivate():boolean{
    if(localStorage.getItem("BasketIds")){
      let basketIds =JSON.parse(localStorage.getItem("BasketIds")!) 
      if(basketIds?.length){
        return true
      }
      else{
        this._Location.back()
        return false;
      }
    }
    else{
      this._Location.back()
      return false;
    }
  }
}
