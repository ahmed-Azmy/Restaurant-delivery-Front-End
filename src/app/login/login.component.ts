import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*============Main Variables============*/
  localStorageKeys:Array<Number> = [];
  basketIds:Array<any> = [];
  baskets:Array<any> = [];
  errorMessage:any;

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService, private _Router:Router , private _Location:Location) { }

  // Form Validation
  loginData = new FormGroup({
    email:new FormControl(null , [
      Validators.required,
      Validators.email
    ]),
    password:new FormControl(null , [
      Validators.required
    ]),
  })

  // Send Form Value to Register Api
  loginValue(){
    if(this.loginData.valid){
      this._RestaurantdeliveryapisService.login(this.loginData.value).subscribe({
        next:(response)=>{
          localStorage.setItem('Token' , response.token);
          this._Router.navigate(['/order']);
        },
        error:(err)=>{
          this.errorMessage = err.error
          console.log(err);
        }
      })
    }
  }

  /*========back last page=======*/
  backClicked(){
    this._Location.back();
  }

  ngOnInit(): void {
    // get baketIDs from LocalStorage
    this.basketIds = JSON.parse(localStorage.getItem("BasketIds")!);

    // Get Baskets By basketIds
    this.basketIds.forEach(element => {
      this._RestaurantdeliveryapisService.getbasket(element).subscribe(
      {
        next:(response)=>{
          this.baskets.push(response.items[0]) 
        },
        error:(error) =>{
          console.log(error)
        }
      })  
    });
  }

}
