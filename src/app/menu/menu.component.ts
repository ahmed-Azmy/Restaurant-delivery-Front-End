import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService , private _ActivatedRoute:ActivatedRoute) { }

  restaurantId:number = this._ActivatedRoute.snapshot.params['id'];
  menuItems:any;
  // selected:Array<Number> = [];
  basketBody:any;
  // uuidValue:any;
  buttonStatus:any;
  basketIds:Array<any> = [];

  // generateUUID(){
  //   this.uuidValue=UUID.UUID();
  //   return this.uuidValue;
  // }
  
  onChange(event:any , name:any, price:any, pictureUrl:any){
    // this.generateUUID();
    // console.log(event.target.checked)
   
    if(event.target.checked){
      // this.selected.push(event.target.value);
      this.basketIds.push(`basket${event.target.value}`);

      // console.log(this.selected);
      console.log(this.basketIds);

      // localStorage.setItem(`${event.target.value}` , this.uuidValue)
      

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
      /**===============================Add item to basket================================== */
      this._RestaurantdeliveryapisService.addbasket(this.basketBody).subscribe(
        {
          next:(response)=>{
          console.log(response)
          this.buttonStatus = true;
        },
        error:(error) =>{
          console.log(error)
        }
        })  
    }
    else{
      // this.selected.splice(this.selected.indexOf(event.target.value),1)
      this.basketIds.splice(this.basketIds.indexOf(`basket${event.target.value}`),1)
      /**===============================delete item to basket================================== */
      this._RestaurantdeliveryapisService.deletebasket(localStorage.getItem(`${event.target.value}`)).subscribe(
        {
          next:(response)=>{
          console.log(response)
          localStorage.removeItem(`${event.target.value}`)
          this.buttonStatus = false;
        },
        error:(error) =>{
          console.log(error)
        }
        }) 
      // console.log(this.selected)
      console.log(this.basketIds)
    }
    localStorage.setItem("BasketIds" , JSON.stringify(this.basketIds))
    // this._RestaurantdeliveryapisService.saveIds(this.selected);
    // let check = this._RestaurantdeliveryapisService.retrieveIDs();
    // console.log(check)
    
  }

  ngOnInit(): void {
    this._RestaurantdeliveryapisService.getMenuForSpecificRestaurant(this.restaurantId).subscribe(
      {
        next:(response)=>{
        console.log(response)
        this.menuItems = response.data
      },
      error:(error) =>{
        console.log(error)
      }
      })
  }
}
