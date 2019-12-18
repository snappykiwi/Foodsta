import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Post } from '../../models/Post';

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
  filteredPostsURL = '/api/posts/searchby/v2/' //url for getting posts using filters

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public postSource: BehaviorSubject<any> = new BehaviorSubject([]);

  getPosts(post?: Post) {
    return this.http.get(`${this.postURL}`);
  }

  getRestPosts(restaurantId: any) {
    return this.http.get(`${this.getRestPostURL}${restaurantId}`);
  }

  getSearchPosts(search: string) {
    return this.http.get(`${this.getSearchPostURL}${search}`);
  }

  getFilteredPosts(gf: boolean = false, vegan: boolean = false, vegetarian: boolean = false) {

    let gfParam = gf ? '1' : '';
    let veganParam = vegan ? '1' : '';
    let vegParam = vegetarian ? '1' : '';

    let param = { "gf": gfParam, "vegan": veganParam, "vegetarian": vegParam };

    let params = new HttpParams()

    Object.keys(param).forEach(function (key) {
      if (param[key])
        params = params.append(key, param[key]);
    });


    if (gf || vegan || vegetarian) {
      return this.http.get<Post[]>(`${this.filteredPostsURL}`, { params: params });
    }
    else {
      return this.getPosts();
    }
  }

  savePost(post: Post) {
    this.http.post(`${this.postURL}`, post)
      .subscribe(res => {
        this.openSnackBar("Post Uploaded!", "Done");
      });
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(`${this.postURL}/${post.id}`, post, httpOptions).pipe(
      tap(updatedPost => console.log(`updated post = ${JSON.stringify(updatedPost)}`))
    );
  }

  deletePost(postId: number): Observable<Post> {
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
