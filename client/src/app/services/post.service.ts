import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  uri = 'http://localhost:4200/api/posts/add';

  constructor(private http: HttpClient) { }

  // addPhoto(image, foodName, restaurant, cuisine, category, rating, user, date) {
  //   const obj = {
  //     image,
  //     foodName,
  //     restaurant,
  //     cuisine,
  //     category,
  //     rating,
  //     user,
  //     date
  //   };
  //   console.log(obj);
  //   this.http.post(`${this.uri}`, obj)
  //       .subscribe(res => console.log('Done'));
  // }

  savePost(post : Post) {
    console.log(post);
    this.http.post(`${this.uri}`, post)
        .subscribe(res => console.log('Done'));
  }

  // posts : Post[];

  // private postSource = new BehaviorSubject<Post>
  //   ({
  //     id : null, 
  //     foodName : null,
  //     rating : null,
  //     restaurant : null,
  //     user : null, 
  //     date : null
  //   });

  // selectedPost = this.postSource.asObservable();

  // constructor() { this.posts = [] }

  // setPost(post: Post) {
  //   this.postSource.next(post);
  // }

  // addLog(post: Post) {
  //   this.posts.unshift(post);
  // }

}
