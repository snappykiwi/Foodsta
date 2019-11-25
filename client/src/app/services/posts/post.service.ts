import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  url = 'http://localhost:4200/api/posts/add';

  constructor(private http: HttpClient) { }

  uploadPost(post : Post) {
    console.log(post);
    this.http.post(`${this.url}`, post)
        .subscribe(res => console.log('Done'));
  }

}
