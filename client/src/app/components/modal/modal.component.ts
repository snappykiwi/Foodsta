import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  editPost() {
    this.postService.updatePost(this.post).subscribe(() => console.log("I just clicked update"));
    console.log(this.post);
  }

  deletePost(postId : number) {
    console.log(this.post);
    this.postService.deletePost(postId).subscribe(_ => {
      // this.post = this.post.filter(eachPost => eachPost.id !== postId);
      console.log(`I just clicked delete`);
    });
  }

}
