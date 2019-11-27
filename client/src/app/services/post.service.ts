import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  uri = 'http://localhost:4200/api/posts/add';

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) { }


  savePost(post : Post) {
    console.log(post);
    this.http.post(`${this.uri}`, post)
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
