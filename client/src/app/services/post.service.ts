import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  posts : Post[];

  private postSource = new BehaviorSubject<Post>
    ({
      id : null, 
      foodName : null,
      rating : null,
      restaurant : null,
      user : null, 
      date : null
    });

  selectedPost = this.postSource.asObservable();

  constructor() { this.posts = [] }

  setPost(post: Post) {
    this.postSource.next(post);
  }

  addLog(post: Post) {
    this.posts.unshift(post);
  }

}
