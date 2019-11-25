import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Search } from '../../models/Search';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SearchService {

  url = 'http://localhost:4200/api/google/place';

  constructor(private http: HttpClient) { }

  // getSearch(search : Search) {
  //   console.log(search);
  //   this.http.get(`${this.url}`, search)
  //       .subscribe(res => console.log(res));
  // }

}
