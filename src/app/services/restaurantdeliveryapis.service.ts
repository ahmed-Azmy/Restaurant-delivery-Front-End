import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestaurantdeliveryapisService {

  constructor(private _HttpClient:HttpClient) { }
 
  
  // Get All Cities
  getAllCities():Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Restaurant/cities`)
  }

  // Get All Restaurants for Specific City
  getRestaurantsForSpecificCity(cityId:Number):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Restaurant?CityId=${cityId}&pageSize=6&PageIndex=1`)
  }

  // Search for Restaurants in Specific City
  searchForRestaurantinSpecificCity(cityId:Number , searchInput:string):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Restaurant?CityId=${cityId}&pageSize=8&PageIndex=1&search=${searchInput}`)
  }

  // Get Menu For Specific Restaurant
  getMenuForSpecificRestaurant(restaurantId:Number , pageNumber:Number):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Meals?RestaurantId=${restaurantId}&pageSize=4&PageIndex=${pageNumber}`)
  }

  // Get basket By ID
  getbasket(basketId:any):Observable<any>{
    return this._HttpClient.get(`https://localhost:5001/api/Basket?basketId=${basketId}`)
  }

  // ADD Or Update Basket 
  addOrUpdatebasket(basketBody:any):Observable<any>{
    return this._HttpClient.post(`https://localhost:5001/api/Basket` , basketBody)
  }

  // Delete Basket By ID
  deletebasket(basketId:any):Observable<any>{
    return this._HttpClient.delete(`https://localhost:5001/api/Basket?basketId=${basketId}`)
  }

  // Register
  register(registerData:any):Observable<any>{
    return this._HttpClient.post(`https://localhost:5001/api/Account/register` , registerData)
  }

  // Login
  login(loginData:any):Observable<any>{
    return this._HttpClient.post(`https://localhost:5001/api/Account/login` , loginData)
  }

  // Get Current Register user
  getCurrentUser():Observable<any>{
    return this._HttpClient.get("https://localhost:5001/api/Account");
  }

  // Make Order
  makeOrder(orderbody:any):Observable<any>{
    return this._HttpClient.post(`https://localhost:5001/api/Order` , orderbody)
  }
}
