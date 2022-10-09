import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService , private _ActivatedRoute:ActivatedRoute) { }

  /*=========================Main Variables==========================*/
  restaurantId:number = this._ActivatedRoute.snapshot.params['id'];
  menuItems:any;
  basketBody:any;
  buttonStatus:any;
  basketIds:Array<any> = [];
  pageNumber:number = 1;
  
  onChange(event:any , name:any, price:any, pictureUrl:any){
    
    if(event.target.checked){
      // basketIDs
      this.basketIds.push(`basket${event.target.value}`);
      // baskest body to send to api
      this.basketBody = {
        "id": `basket${event.target.value}`,
        "items": [
          {
            "id": event.target.value,
            "mealName": name,
            "price": price,
            "quantity": 1,
            "pictureUrl": pictureUrl
          }
        ]
      }
      /**===============================Add item to basket================================ */
      this._RestaurantdeliveryapisService.addOrUpdatebasket(this.basketBody).subscribe(
      {
        next:()=>{
          this.buttonStatus = true;
        },
        error:(error) =>{
          console.log(error)
        }
      })  
    }
    else{
      //remove basketId form BasketIDs Array
      this.basketIds.splice(this.basketIds.indexOf(`basket${event.target.value}`),1)

      /**===============================delete item to basket================================== */
      this._RestaurantdeliveryapisService.deletebasket(`basket${event.target.value}`).subscribe(
      {
        next:()=>{
          if(!this.basketIds?.length){
            this.buttonStatus = false;
          }
        },
        error:(error) =>{
          console.log(error)
        }
      }) 
    }

    // Store basketIDs in LocalStorage to use it in onthor component
    localStorage.setItem("BasketIds" , JSON.stringify(this.basketIds))
  }

  // pagination
  Page(event:any){
    this._RestaurantdeliveryapisService.getMenuForSpecificRestaurant(this.restaurantId , event.target.value).subscribe(
    {
      next:(response)=>{
        this.menuItems = response.data
      },
      error:(error) =>{
        console.log(error)
      }
    })
  }

  ngOnInit(): void {
    //get menu for specific resturant
    this._RestaurantdeliveryapisService.getMenuForSpecificRestaurant(this.restaurantId , this.pageNumber).subscribe(
    {
      next:(response)=>{
        this.menuItems = response.data
      },
      error:(error) =>{
        console.log(error)
      }
    })
  }
}
