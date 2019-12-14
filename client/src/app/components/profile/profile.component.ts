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
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  posts: any[] = [];
  currentUserId = "";
  currentUserName = "";
  currentUserPic = "";

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
    userId: "",
    userName: ""
  };

  user_data: any = {
    nickname: this.currentUserName,
    picture: this.currentUserPic,
    user_metadata: {
      firstName: "",
      lastName: "",
      age: "",
      phone: ""
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
    private actr: ActivatedRoute,
    private uploadService: UploadService
  ) {
    this.actr.data.map(data => data.token).subscribe((res) => {
      console.log(res);
    })
  }

  getUserPosts() {
    this.profileService.getUsersPosts(this.currentUserId).subscribe((posts: any[]) => {
      console.log(`posts from user : ${posts}`);
      this.posts = posts;
    });
  };

  updateAuthData() {
    this.profileService.updateUserInfo(this.currentUserId, this.user_data).subscribe(res => {
      console.log(res);
    })
  };

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
    const reader = new FileReader();
    reader.readAsDataURL(this.imageObj);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  };

  onImageUpload() {
    if (this.imageObj) {

      const imageForm = new FormData();
      imageForm.append('picture', this.imageObj);

      this.uploadService.imageUpload(imageForm).subscribe(res => {

        this.user_data.picture = res['Location'];
        console.log(this.user_data.picture);

        this.updateAuthData();
      });
    } else {
      this.updateAuthData();
    }

  };

  setUserData() {

    this.currentUserId = this.auth.userProfileSubject$.value.sub;
    this.currentUserName = this.auth.userProfileSubject$.value.nickname;
    this.currentUserPic = this.auth.userProfileSubject$.value.picture;
    this.post.userId = this.auth.userProfileSubject$.value.sub;
    this.post.userName = this.auth.userProfileSubject$.value.nickname;

  }

  ngOnInit() {
    console.log("component initiated")

    this.auth.getUser$();

    this.setUserData();

    this.profileService.getUserData(this.currentUserId).subscribe(res => {
      console.log(`data from auth0 : ${res}`);
    });
    this.getUserPosts();
  };


}