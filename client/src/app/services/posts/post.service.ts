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

export class PostService {

  postURL = '/api/posts'; // url for submitting form data
  getRestPostURL = '/api/posts/restaurant/'; // url for getting posts for specific restaurant
  getSearchPostURL = '/api/posts/partial/'; // url for getting posts based on user search

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public postSource: BehaviorSubject<any> = new BehaviorSubject([]);

  getPosts(post?: Post) {
    return this.http.get(`${this.postURL}`);
  }

  getRestPosts(restaurantId: any) {
    console.log(restaurantId);
    return this.http.get(`${this.getRestPostURL}${restaurantId}`);
  }

  getSearchPosts(search: string) {
    console.log(search);
    return this.http.get(`${this.getSearchPostURL}${search}`);
  }

  savePost(post: Post) {
    console.log(post);
    this.http.post(`${this.postURL}`, post)
      .subscribe(res => {
        console.log('Done')
        this.openSnackBar("Post Uploaded!", "Done");
      });
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.postURL}/${post.id}`, post, httpOptions).pipe(
      tap(updatedPost => console.log(`updated post = ${JSON.stringify(updatedPost)}`))
    );
  }

  deletePost(postId: number): Observable<Post> {
    console.log(`${this.postURL}/${postId}`);
    return this.http.delete<Post>(`${this.postURL}/${postId}`, httpOptions).pipe(
      tap(_ => console.log(`Deleted post with the id of ${postId}`)),
      catchError(error => of(null))
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
