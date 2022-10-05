import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantdeliveryapisService {

  constructor(private _HttpClient:HttpClient) { }
 
  

  getAllCities():Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Restaurant/cities`)
  }

  getRestaurantsForSpecificCity(cityId:Number):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Restaurant?CityId=${cityId}&pageSize=6&PageIndex=1`)
  }

  searchForRestaurantinSpecificCity(cityId:Number , searchInput:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Restaurant?CityId=${cityId}&pageSize=8&PageIndex=1&search=${searchInput}`)
  }

  getMenuForSpecificRestaurant(restaurantId:Number):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Meals?RestaurantId=${restaurantId}&pageSize=4&PageIndex=1`)
  }

  getbasket(basketId:any):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Basket?basketId=${basketId}`)
  }

  addbasket(basketBody:Number):Observable<any>{
    return this._HttpClient.post(`https://localhost:5001/api/Basket` , basketBody)
  }

  deletebasket(basketId:any):Observable<any>{
    return this._HttpClient.delete(`https://localhost:5001/api/Basket?basketId=${basketId}`)
  }

}
