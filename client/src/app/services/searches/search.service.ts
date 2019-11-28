import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Search } from '../../models/Search';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SearchService {

  // url to access get back data from google api
  private url : string = `http://localhost:4200/api/google/place/`;

  constructor(private http: HttpClient) { }

  // gets user input from search bar and uses the google api to search for restaurants
  getSearch(input: string) : Observable<Search[]> {
    let searchInput = new HttpParams().set('searchInput', input)
    console.log(this.url + input);
    return this.http.get<Search[]>(`${this.url}`, { params : searchInput });
  }

}
