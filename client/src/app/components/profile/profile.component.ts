import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { UploadService } from '../../services/uploads/upload.service';
import { PostService } from 'src/app/services/posts/post.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Post } from 'src/app/models/Post';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  posts: any[] = [];
  currentUserId: string;
  currentUserName: string;
  currentUserPic: string;
  profilePic: string;

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
    // nickname: this.currentUserName,
    // picture: this.currentUserPic,
    user_metadata: {
      // nickname: (this.currentUserName !== "") ? this.currentUserName : this.auth.userProfileSubject$.value.nickname,
      // picture: (this.currentUserPic !== "") ? this.currentUserPic : this.auth.userProfileSubject$.value.picture
      // username: this.currentUserName,
      picture: this.currentUserPic
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
    public profileService: ProfileService,
    private actr: ActivatedRoute,
    private uploadService: UploadService
  ) {
    this.actr.data.map(data => data.token).subscribe((res) => {
      console.log(res);
    })
  }

  emptyImage() {
    this.imageObj = null;
  }

  getUserPosts() {
    this.profileService.getUsersPosts(this.currentUserId).subscribe((posts: any[]) => {
      this.posts = posts;
    });
  };

  updateAuthData() {

    this.profileService.updateUserInfo(this.currentUserId, this.user_data).subscribe((res: any) => {
      console.log(res);
      this.profileService.profilePicSource.next(res.user_metadata.picture);

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

        this.user_data.user_metadata.picture = res['Location'];

        // this.user_data.user_metadata.username = this.currentUserName;

        this.updateAuthData();
      });
    } else {
      this.currentUserPic ? this.currentUserPic : this.user_data.user_metadata.picture;
      // this.user_data.user_metadata.username = this.currentUserName;
      this.updateAuthData();
    }
    this.emptyImage();
  };

  // updateUsername() {

  //   this.user_data.user_metadata.username = this.currentUserName;
  // }

  setUserData() {

    this.currentUserId = this.auth.userProfileSubject$.value.sub;
    this.currentUserName = this.user_data.given_name ? this.user_data.given_name : this.auth.userProfileSubject$.value.nickname;
    this.currentUserPic = this.user_data.user_metadata.picture;
    this.post.userId = this.auth.userProfileSubject$.value.sub;
    this.post.userName = this.user_data.user_metadata.username ? this.user_data.user_metadata.username : this.auth.userProfileSubject$.value.username;

    this.profileService.currentUserId.next(this.auth.userProfileSubject$.value.sub);
  }

  ngOnInit() {

    this.auth.getUser$();

    this.setUserData();

    this.profileService.getUserData(this.currentUserId).subscribe((res: any) => {

      this.currentUserName = res.hasOwnProperty("given_name") ? res.given_name : res.nickname;
      this.currentUserPic = res.hasOwnProperty("user_metadata") && res.user_metadata.hasOwnProperty("picture") ? res.user_metadata.picture : res.picture;
      this.profileService.profilePicSource.next(this.currentUserPic);
      this.profilePic = this.profileService.profilePicSource.value;
    });
    this.getUserPosts();
  };


}