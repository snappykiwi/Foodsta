import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { Post } from '../../models/Post';
import { Restaurant } from 'src/app/models/Restaurant';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  // url for submitting form data
  postURL = 'http://localhost:4200/api/posts/add';
  // url for getting all posts from db
  getPostURL = 'http://localhost:4200/api/posts';
  getRestPostURL = 'http://localhost:4200/api/posts/restaurant/';
  // url for updating/deleting posts
  updateOrDeletePostURL = 'http://localhost:4200/api/posts/:id';

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

  // getRestPosts(restaurant: Restaurant) {
  //   this.http.get(`${this.getRestPostURL}restaurant.id`)
  //     .subscribe(res => {
  //       console.log('Got restaurant posts', res)
  //       this.postSource.next(res);
  //       console.log(this.postSource.value.length);
  //     });
  // }

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
        console.log('Updated')

      })
  }

  updatePost(post : Post) : Observable<Post[]> {
    let user = new HttpParams().set('user', post.user);
    console.log(`${this.updateOrDeletePostURL}${user}`);
    return this.http.put<Post[]>(`${this.updateOrDeletePostURL}`, { params : user });
  }

  deletePost(post : Post) : Observable<Post[]> {
    let user = new HttpParams().set('user', post.user);
    let options = { params : user }
    console.log(`${this.updateOrDeletePostURL}${user}`);
    return this.http.delete<Post[]>(`${this.updateOrDeletePostURL}`, options);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
