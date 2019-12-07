import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Post } from '../../models/Post';
import { Restaurant } from 'src/app/models/Restaurant';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  getMetaData = 'http://localhost:4200/auth0/user/';

  constructor(
    private http: HttpClient
  ) { }

  getUserData(userId : string) {
    return this.http.get(`${this.getMetaData}${userId}`)
  }

}
