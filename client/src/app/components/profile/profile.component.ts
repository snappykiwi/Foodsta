import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';
import { PostService } from 'src/app/services/posts/post.service';
import { Post } from 'src/app/models/Post';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  // sets 'post' to the Post model to access/set it's properties
  post : Post = {
    id : "",
    image : "",
    title : "",
    caption : "",
    cuisine : "",
    category : "",
    gf : false,
    vegan : false,
    vegetarian : false,
    rating : 0,
    restaurantName: {},
    restaurantId: "",
    user : this.auth.userProfileSubject$.value.sub
  };

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private postService: PostService
    ) { }

  ngOnInit() { }

  editPost() {
    this.postService.updatePost(this.post);
    console.log(this.post);
  }

  deletePost() {
    console.log(this.post);
    this.postService.deletePost(this.post);
  }

}