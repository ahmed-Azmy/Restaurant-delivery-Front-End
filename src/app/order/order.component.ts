import { Component, OnInit } from '@angular/core';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  /*=================Main Variables===================*/
  basketIds:Array<any> = [];
  baskets:Array<any> = [];
  totalPrice:number = 0;
  basketBody:any;
  orderBody:any;
  currentUser:any;
  alertStatus:any;

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService , private _Location:Location) {}

  /*=================Increase Quantity by 1 for every Call===================*/
  increaseQuantity(id:Number ,mealName:any , price:any, quantity:any, pictureUrl:any){
    // basket body for send to api
    this.basketBody = {
      "id": `basket${id}`,
      "items": [
        {
          "id": id,
          "mealName": mealName,
          "price": price,
          "quantity": quantity + 1,
          "pictureUrl": pictureUrl
        }
      ]
    }

    // Update basket with new quantity
    this._RestaurantdeliveryapisService.addOrUpdatebasket(this.basketBody).subscribe(
    {
      next:()=>{
      },
      error:(error) =>{
        console.log(error)
      }
    })  

    // recall getbasket api to make change
    this._RestaurantdeliveryapisService.getbasket(`basket${id}`).subscribe(
    {
      next:(response)=>{
        let itemIndex =  this.baskets.findIndex(item => item.id == response.items[0].id);
        this.baskets[itemIndex] = response.items[0];
        this.totalPrice += response.items[0].price
      },
      error:(error) =>{
        console.log(error)
      }
    })  
  }

  /*=================decrease Quantity by 1 for every Call===================*/
  decreaseQuantity(id:Number ,mealName:any , price:any, quantity:any, pictureUrl:any){
    // if condition to make sure At least the Quantity Equal 1.
    if(quantity > 1)
    {
      // basket body for send to api
      this.basketBody = {
        "id": `basket${id}`,
        "items": [
          {
            "id": id,
            "mealName": mealName,
            "price": price,
            "quantity": quantity - 1,
            "pictureUrl": pictureUrl
          }
        ]
      }
    
      // Update basket with new quantity
      this._RestaurantdeliveryapisService.addOrUpdatebasket(this.basketBody).subscribe(
      {
        next:()=>{
        },
        error:(error) =>{
          console.log(error)
        }
      })  

      // recall getbasket api to make change
      this._RestaurantdeliveryapisService.getbasket(`basket${id}`).subscribe(
      {
        next:(response)=>{
          let itemIndex =  this.baskets.findIndex(item => item.id == response.items[0].id);
          this.baskets[itemIndex] = response.items[0];
          this.totalPrice -= response.items[0].price
        },
        error:(error) =>{
          console.log(error)
        }
      })  
    }
  }

  /*=========================Remove basket===========================*/
  removeBasket(id:Number){
    // delete basket from redis
    this._RestaurantdeliveryapisService.deletebasket(`basket${id}`).subscribe(
    {
      next:()=>{
      },
      error:(error) =>{
        console.log(error)
      }
    })  
      
    // remove basketId for removed basket from localStorage
    this.basketIds = JSON.parse(localStorage.getItem('BasketIds')!)
    this.basketIds.splice(this.basketIds.indexOf(`basket${id}`), 1);
    localStorage.setItem('BasketIds', JSON.stringify(this.basketIds))

    // get basketIds from LocalStorage After remove
    this.basketIds =JSON.parse(localStorage.getItem("BasketIds")!) 
    // make total price 0
    this.totalPrice = 0;
    // make baskets Empty to fill it again after remove
    this.baskets = [];
    // Get baskets and Total Price
    this.basketIds.forEach(element => {
      this._RestaurantdeliveryapisService.getbasket(element).subscribe(
      {
        next:(response)=>{
          this.baskets.push(response.items[0]) 
          this.totalPrice += Number(response.items[0].price) * Number(response.items[0].quantity)
        },
        error:(error) =>{
          console.log(error)
        }
      })  
    });
  }

  /*=========================Confirm Order===========================*/
  makeOrder(){
    this.basketIds.forEach(basketId => {
      this.orderBody = {
        "basketId": basketId,
        "shipToAddress": this.currentUser.address
      }
      this._RestaurantdeliveryapisService.makeOrder(this.orderBody).subscribe({
        next:()=>{
          this.alertStatus = true;
        },
        error:(error)=>{
          console.log(error)
          this.alertStatus = false;
        }
      })
    });
  }

  /*========back last page=======*/
  backClicked(){
    this._Location.back();
  }

  ngOnInit(): void {
    // get information for register user
    this._RestaurantdeliveryapisService.getCurrentUser().subscribe(
    {
      next:(response)=>{
        this.currentUser = response
      },
      error:(error) =>{
        console.log(error)
      }
    })  

    // get basketIds from localStorage to get baskets
    this.basketIds = JSON.parse(localStorage.getItem("BasketIds")!);
      
    // get basket 
    this.basketIds.forEach(element => {
      this._RestaurantdeliveryapisService.getbasket(element).subscribe(
      {
        next:(response)=>{
          this.baskets.push(response.items[0]) 
          this.totalPrice += Number(response.items[0].price) * Number(response.items[0].quantity)
        },
        error:(error) =>{
          console.log(error)
        }
      })  
    });  
  }
}
