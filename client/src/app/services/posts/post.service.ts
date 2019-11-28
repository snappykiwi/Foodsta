import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  postURL = 'http://localhost:4200/api/posts/add';
  getPostURL = 'http://localhost:4200/api/posts';

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) { }

  getPost(post : Post) {
    this.http.get(`${this.getPostURL}`)
      .subscribe(res => console.log("Got Posts!", res));
  }

  savePost(post : Post) {
    console.log(post);
    this.http.post(`${this.postURL}`, post)
        .subscribe(res => {
          console.log('Done')
          this.openSnackBar("Post Uploaded!", "Done");
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
