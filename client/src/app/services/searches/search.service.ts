import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Search } from '../../models/Search';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Restaurant } from 'src/app/models/Restaurant';


@Injectable({
  providedIn: 'root'
})

export class SearchService {

  // url to access get back data from google api
  private url : string = `http://localhost:4200/api/google/place/`;

  public restaurantSource : BehaviorSubject<Search[]> = new BehaviorSubject([]);
  public restaurants = this.restaurantSource.asObservable();

  public currentRestaurantSource: BehaviorSubject<Restaurant> = new BehaviorSubject({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
    openingHour: "",
    openNow: null,
    priceLevel: 1,
    websiteUrl: ""});
  public currentRestaurant = this.currentRestaurantSource.asObservable;


  constructor(private http: HttpClient) { }

  // gets user input from search bar and uses the google api to search for restaurants
  getSearch(input: string) : Observable<Search[]> {

    let searchInput = new HttpParams().set('searchInput', input)
    console.log(this.url + input);
    return this.http.get<Search[]>(`${this.url}`, { params : searchInput });

  }

}
