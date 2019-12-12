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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  getMetaData = '/api/auth0/user/';
  getUserPosts = '/api/posts/user/';
  updateUserData = '/api/auth0/update/';

  constructor(
    private http: HttpClient
  ) { }

  getUserData(userId: string) {
    return this.http.get(`${this.getMetaData}${userId.slice(6)}`);
  }

  getUsersPosts(userId: string) {
    return this.http.get(`${this.getUserPosts}${userId.slice(6)}`);
  }

  updateUserInfo(userId: string, metadata: any) {
    return this.http.patch(`${this.updateUserData}${userId.slice(6)}`, metadata, httpOptions).pipe(
      tap(updatedUser => console.log(`updated post = ${JSON.stringify(updatedUser)}`))
    );
  }

}
