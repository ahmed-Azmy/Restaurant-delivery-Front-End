import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /*============Main Variables============*/
  localStorageKeys:Array<Number> = [];
  basketIds:Array<any> = [];
  baskets:Array<any> = [];
  isEmailExist:any;

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService, private _Router:Router ,private _Location:Location) { }
  
  // Form Validation
  registerData = new FormGroup({
    userName:new FormControl( null , [
      Validators.minLength(3),
      Validators.maxLength(60),
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$")
    ]),
    email:new FormControl(null , [
      Validators.required,
      Validators.email
    ]),
    phoneNumber:new FormControl(null , [
      Validators.required,
      Validators.pattern("[0-9 ]{11}")
    ]),
    password:new FormControl(null , [
      Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}")
    ]),
    address:new FormControl(null , [
      Validators.required
    ]),
  })

  // Send Form Value to Register Api
  registerValue(){
    if(this.registerData.valid){
      this._RestaurantdeliveryapisService.register(this.registerData.value).subscribe({
        next:(response)=>{
          localStorage.setItem('Token' , response.token);
          this._Router.navigate(['/order']);
        },
        error:(err)=>{
          this.isEmailExist = err.error
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
    // Get BasketIDs from LocalStorage
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
