import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../../auth.service';
import { Post } from '../../models/Post';
import { PostService } from 'src/app/services/posts/post.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers : [NgbRatingConfig]
})
export class ModalComponent implements OnInit {

  // sets 'post' to the Post model to access/set it's properties
  // post : Post = {
  //   id : "",
  //   image : "",
  //   title : "",
  //   caption : "",
  //   cuisine : "",
  //   category : "",
  //   gf : false,
  //   vegan : false,
  //   vegetarian : false,
  //   rating : 0,
  //   restaurantName: {},
  //   restaurantId: "",
  //   user : this.auth.userProfileSubject$.value.sub
  // };

  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<ModalComponent>,
    public dialog: MatDialog,
    private config: NgbRatingConfig,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public post : Post)
    { 
      config.max = 5;
      config.readonly = true;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  editPost(post: Post) {
    this.postService.updatePost(this.post);
    console.log(this.post);
  }

  deletePost(post: Post) {
    console.log(this.post);
    this.postService.deletePost(this.post);
  }

}
