import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  localStorageKeys:Array<Number> = [];
  basketIds:Array<any> = [];
  baskets:Array<any> = [];

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService) { }
  
  registerData = new FormGroup({
    userName:new FormControl( null , [
      Validators.minLength(3),
      Validators.maxLength(60),
      Validators.required,
      Validators.pattern(/^[A-Z]/)
    ]),
    email:new FormControl(null , [
      Validators.required,
      Validators.email
    ]),
    phoneNumber:new FormControl(null , [
      Validators.required,
      Validators.min(11)
    ]),
    password:new FormControl(null , [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[a-zA-z]/)
    ]),
    address:new FormControl(null , [
      Validators.required,
      Validators.minLength(10)
    ]),
  })

  registerValue(){
    if(this.registerData.valid){
      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
      //  this.subStatus = this._PostApiService.register(this.registerData.value).subscribe({
      //    next:(response)=>{
      //      this.message = response.message;
      //      if(response.message == 'success'){
      //        this._Router.navigate(['/login']);
      //      }
      //    },
      //    error:(error)=>{
      //      console.log(error);
      //    }
      //  })
    }
  }

  ngOnInit(): void {
    // let result = this._RestaurantdeliveryapisService.retrieveIDs();
    // this.localStorageKeys = result;
    // console.log(result)
    // console.log(this.localStorageKeys)
    
    this.basketIds = JSON.parse(localStorage.getItem("BasketIds")!);
    console.log(this.basketIds)

    this.basketIds.forEach(element => {

      

      this._RestaurantdeliveryapisService.getbasket(element).subscribe(
      {
        next:(response)=>{
          this.baskets.push(response.items[0]) 
        console.log(this.baskets)
      },
      error:(error) =>{
        console.log(error)
      }
      })  

      // this.basketIds.push(result);

    });

  }

}
