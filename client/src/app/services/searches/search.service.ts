import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Search } from '../../models/Search';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private url : string = `http://localhost:4200/api/google/place/restaurants`;

  constructor(private http: HttpClient) { }

  // getSearch(search : Search) {
  //   console.log(search);
  //   this.http.get(`${this.url}`, search)
  //       .subscribe(res => console.log(res));
  // }

  getSearch() : Observable<Search[]> {
    return this.http.get<Search[]>(`${this.url}`);
  }

}
