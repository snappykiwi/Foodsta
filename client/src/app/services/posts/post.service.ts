import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { Post } from '../../models/Post';
import { Restaurant } from 'src/app/models/Restaurant';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  postURL = 'http://localhost:4200/api/posts/add'; // url for submitting form data
  getPostURL = 'http://localhost:4200/api/posts'; // url for getting all posts from db
  getRestPostURL = 'http://localhost:4200/api/posts/restaurant/'; //url for getting posts for specific restaurant
  getSearchPostURL = 'http://localhost:4200/api/posts/partial/'; //url for getting posts based on user search

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) { }

    public postSource : BehaviorSubject<any> = new BehaviorSubject([]);
    public posts = this.postSource.asObservable();

  getPost(post?: Post) {
    this.http.get(`${this.getPostURL}`)
      .subscribe(res => {
        console.log("Got Posts!", res)
        this.postSource.next(res);
        console.log(this.postSource);
      });
  }

  savePost(post: Post) {
    console.log(post);
    this.http.post(`${this.postURL}`, post)
      .subscribe(res => {
        console.log('Done')
        this.openSnackBar("Post Uploaded!", "Done");
      });
  }

  getRestPosts(restaurant: Restaurant) {
    console.log(restaurant.id);
    this.http.get(`${this.getRestPostURL}${restaurant.id}`)
      .subscribe(res => {
        console.log('Got restaurant posts', res)
        this.postSource.next(res);
        console.log(this.postSource.value.length);
      });
  }

  getSearchPosts(search: string) {
    console.log(search);
    this.http.get(`${this.getSearchPostURL}${search}`)
      .subscribe(res => {
        console.log('Got search posts', res)
        this.postSource.next(res);
        console.log(this.postSource.value.length);
      })
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
