import { Component, OnInit, Inject, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { UploadService } from '../../services/uploads/upload.service';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';
import { PostService } from 'src/app/services/posts/post.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Post } from 'src/app/models/Post';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  posts: any[] = [];
  currentUserId = this.auth.userProfileSubject$.value.sub;
  currentUserName = this.auth.userProfileSubject$.value.nickname;
  currentUserPic = this.auth.userProfileSubject$.value.picture;

  // sets 'post' to the Post model to access/set it's properties
  post: Post = {
    id: "",
    image: "",
    title: "",
    caption: "",
    cuisine: "",
    gf: false,
    vegan: false,
    vegetarian: false,
    rating: 0,
    restaurantName: "",
    restaurantId: "",
    userId: this.currentUserId,
    userName: this.auth.userProfileSubject$.value.nickname
  };

  user_data : any = {
    nickname : this.currentUserName,
    picture : this.currentUserPic,
    user_metadata : {
      firstName : "",
      lastName : "",
      age : "",
      phone : ""
    }
  }

  image = "";
  imageObj: File;
  imgURL: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public dialog: MatDialog,
    private postService: PostService,
    private profileService: ProfileService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {

    this.getUserPosts();

    this.profileService.getUserData(this.currentUserId).subscribe(res => {
      console.log(`data from auth0 : ${JSON.stringify(res)}`);
      // console.log(res.firstName);
      this.user_data.user_metadata.res.firstName;
      this.user_data.user_metadata.res.lastName;
      this.user_data.user_metadata.res.age;
      this.user_data.user_metadata.res.phone;
    });

  }

  getUserPosts() {
    this.profileService.getUsersPosts(this.currentUserId).subscribe((posts: any[]) => {
      console.log(`posts from user : ${posts}`);
      this.posts = posts;
    });
  }

  updateAuthData() {
    this.profileService.updateUserInfo(this.currentUserId, this.user_data).subscribe(res => {
      console.log(res);
    })
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;

    const reader = new FileReader();
    reader.readAsDataURL(this.imageObj);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('picture', this.imageObj);

    this.uploadService.imageUpload(imageForm).subscribe(res => {

      this.post.image = res['Location'];
      console.log(this.post.image);

      if (this.post.image) {
        // this.savePhoto();
      }

    });
  }

}