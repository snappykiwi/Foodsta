import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/posts/post.service';
import { Post } from 'src/app/models/Post';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/uploads/upload.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/models/Restaurant';
import { Search } from 'src/app/models/Search';
import { SearchService } from 'src/app/services/searches/search.service';
import { AutocompleteService } from 'src/app/services/autocompletes/autocomplete.service';
import { ThemeService } from 'src/app/services/themes/theme.service';

export interface SelectOptions {
  value: string;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  providers: [NgbRatingConfig]
})

export class AddPostComponent implements OnInit {

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
    userId: this.auth.userProfileSubject$.value.sub,
    userName: this.auth.userProfileSubject$.value.nickname
  };

  image = "";
  imageObj: File;
  imgURL: any;

  // code for location search 
  restaurants$: any;
  private searchTerms = new Subject<string>();
  private restaurantName = new BehaviorSubject<string>("");

  readonlyReview = true;
  isDarkTheme: Observable<boolean>

  constructor(
    public auth: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private searchService: SearchService,
    private themeService: ThemeService,
    private autocompleteService: AutocompleteService,
    private router: Router,
    private config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  search(term: string): void {
    if (term) {
      this.searchTerms.next(term);
      console.log(this.restaurants$);
    }
  }

  ngOnInit(): void {

    console.log(this.auth.userProfileSubject$.value);
    console.log(this.auth.userProfileSubject$.value.nickname);

    this.restaurants$ = this.searchTerms.pipe(

      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.searchService.autocompleteRestaurants(term))
    );

    this.isDarkTheme = this.themeService.isDarkTheme;

  }

  getInfo(optionInfo) {
    this.post.restaurantId = optionInfo.place_id;
    this.post.restaurantName = optionInfo.description;
    this.restaurantName.next(optionInfo.description);
    console.log(optionInfo);
    console.log(this.post.restaurantName);
    console.log(this.post.restaurantId);
    console.log(this.post);
    // let url = 'https://jsonplaceholder.typicode.com/posts?userId='+userId;
    // this.http.get(`${url}`).subscribe(posts => {
    //     this.posts = [...posts];
    // });
  }

  getRestaurantName(option) {
    return option.description
  }

  getPosts() {
    this.postService.getPosts(this.post);
  }

  savePhoto() {
    console.log(this.post);
    this.postService.savePost(this.post);
    this.router.navigate(['home']);
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
        this.savePhoto();
      }

    });
  }

  categories: SelectOptions[] = [
    { value: 'Mexican' },
    { value: 'Thai' },
    { value: 'Chinese' },
    { value: 'Nepalese' },
    { value: 'Italian' },
    { value: 'American' },
    { value: 'Fast Food' },
    { value: 'Vietnamese' },
    { value: 'Barbeque' },
    { value: 'Seafood' },
    { value: 'Central American' },
    { value: 'Spanish' },
    { value: 'Brazilian' },
    { value: 'Caribbean' },
    { value: 'Cajun' },
    { value: 'African' },
    { value: 'Other' }
  ];

}
