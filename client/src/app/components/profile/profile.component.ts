import { Component, OnInit, Inject, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
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

  user_metadata : any = {
    firstName : "",
    lastName : "",
    age : "",
    phone : ""
  }

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
    private profileService: ProfileService
  ) { }

  ngOnInit() {

    this.getUserPosts();

    this.profileService.getUserData(this.currentUserId).subscribe(res => {
      console.log(`data from auth0 : ${res}`);
    });

  }

  getUserPosts() {
    this.profileService.getUsersPosts(this.currentUserId).subscribe((posts: any[]) => {
      console.log(`posts from user : ${posts}`);
      this.posts = posts;
    });
  }

  updateAuthData() {
    this.profileService.updateUserInfo(this.currentUserId, this.user_metadata).subscribe(res => {
      console.log(res);
    })
  }

}