import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/posts/post.service';
import { Post } from 'src/app/models/Post';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/uploads/upload.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/models/Restaurant';
import { Search } from 'src/app/models/Search';
import { SearchService } from 'src/app/services/searches/search.service';
import { AutocompleteService } from 'src/app/services/autocompletes/autocomplete.service';

export interface SelectOptions {
  value: string;
}

@Component({
  selector : 'app-add-post',
  templateUrl : './add-post.component.html',
  styleUrls : ['./add-post.component.scss'],
  providers : [NgbRatingConfig]
})

export class AddPostComponent implements OnInit {
    
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
    userId : this.auth.userProfileSubject$.value.sub
  };
  
  image = "";
  imageObj: File;
  imgURL: any;

  // code for location search 
  restaurants$: Observable<Search[]>;
  private searchTerms = new Subject<string>();

  constructor(
    public auth: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private searchService: SearchService,
    private autocompleteService: AutocompleteService,
    private router: Router,
    private config: NgbRatingConfig)

  {     
    config.max = 5;
    config.readonly = true;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    console.log(this.auth.userProfileSubject$.value.sub);

    this.restaurants$ = this.searchTerms.pipe(

      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.searchService.getSearch(term)),
    );

    
  }

  getInfo(optionInfo){
    this.post.restaurantId = optionInfo.id;
    // this.post.restaurantName = optionInfo.name;
    console.log(optionInfo);
    console.log(this.post.restaurantName);
    // let url = 'https://jsonplaceholder.typicode.com/posts?userId='+userId;
    // this.http.get(`${url}`).subscribe(posts => {
    //     this.posts = [...posts];
    // });
  }

  getRestaurantName(option) {
    return option.name
  }

  // this gets the posts from the db
  // needs to be added in html
  // not sure where you want it
  // to show that it works, I put it in the ngOnInit() so it loads with the component
  getPosts() {
    this.postService.getPost(this.post);
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

  // foods: SelectOptions[] = [
  //   { value: 'Steak' },
  //   { value: 'Pizza' },
  //   { value: 'Tacos' },
  //   { value: 'Burgers' },
  //   { value: 'Salad' },
  //   { value: 'Sandwich' },
  //   { value: 'Soup' },
  //   { value: 'Other' }
  // ];

}
