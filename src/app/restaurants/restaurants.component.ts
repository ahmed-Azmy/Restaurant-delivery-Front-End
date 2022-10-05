import { Component, OnInit } from '@angular/core';
import { RestaurantdeliveryapisService } from '../services/restaurantdeliveryapis.service';
RestaurantdeliveryapisService
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor(private _RestaurantdeliveryapisService:RestaurantdeliveryapisService) { }

  options:any; 
  Restaurants:any;
  RestaurantsSearch:any;
  searchInput:any;
  cityId:Number = 1;

  /*================ Get Restaurant based on Selected City =============*/ 
  getCityId(event:any){
    this.cityId = event.target.value;
    this._RestaurantdeliveryapisService.getRestaurantsForSpecificCity(this.cityId).subscribe(
      {
        next:(response)=>{
          this.Restaurants = response.data;
        },
        error:(error) =>{
          console.log(error)
        }
      }
    )
  }
  /*================ Search for Restaurant based on Selected City =============*/ 
  Search(){
    if(this.searchInput.length >= 1){
    this._RestaurantdeliveryapisService.searchForRestaurantinSpecificCity(this.cityId , this.searchInput).subscribe(
    {
      next:(response)=>{
      this.RestaurantsSearch = response.data;
    },
    error:(error) =>{
      console.log(error)
    }
    })
    }
  }
  ngOnInit(): void {
      /*=============== Get All Cities ===============*/ 
      this._RestaurantdeliveryapisService.getAllCities().subscribe(
      {
        next:(response)=>{
        this.options = response
      },
      error:(error) =>{
        console.log(error)
      }
      })

      /*================ Get Restaurant in City His id = 1 To be defult=============*/ 
      this._RestaurantdeliveryapisService.getRestaurantsForSpecificCity(1).subscribe(
        {
          next:(response)=>{
            this.Restaurants = response.data;
          },
          error:(error) =>{
            console.log(error)
          }
        }
      )
  }
}
