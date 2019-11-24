import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';

export interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})

export class AddPhotoComponent implements OnInit {


  post : Post = {
    image : "",
    foodName : "",
    cuisine : "",
    category : "",
    rating : 0,
    user : "",
    date : new Date()
  };
  
  // newPost : boolean = true;

  constructor(private postService : PostService) {

  }

  // addPhotoFormGroup = new FormGroup({
  //   photoControl: new FormControl('')
  // });

  // detailsFormGroup = new FormGroup({
  //   detailsControl1: new FormControl(''),
  //   detailsControl2: new FormControl(''),
  //   detailsControl3: new FormControl('')
  // });

  // ratingsFormGroup = new FormGroup({
  //   ratingsControl: new FormControl('')
  // });

  // reviewFormGroup = new FormGroup({
  //   reviewControl: new FormControl('')
  // });

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  addPhoto(foodName, rating, restaurant, user, date) {
    console.log(this.post);

    this.postService.addPhoto(foodName, rating, restaurant, user, date);
  }

  categories: SelectOptions[] = [
    {value: 'Mexican', viewValue: 'Mexican'},
    {value: 'Thai', viewValue: 'Thai'},
    {value: 'Chinese', viewValue: 'Chinese'},
    {value: 'Italian', viewValue: 'Italian'},
    {value: 'American', viewValue: 'American'},
    {value: 'Fast Food', viewValue: 'Fast Food'},
    {value: 'Other', viewValue: 'Other'}
  ];

  foods: SelectOptions[] = [
    {value: 'Steak', viewValue: 'Steak'},
    {value: 'Pizza', viewValue: 'Pizza'},
    {value: 'Tacos', viewValue: 'Tacos'},
    {value: 'Burgers', viewValue: 'Burger'},
    {value: 'Salad', viewValue: 'Salad'},
    {value: 'Sandwich', viewValue: 'Sandwich'},
    {value: 'Soup', viewValue: 'Soup'},
    {value: 'Other', viewValue: 'Other'}
  ];


  ngOnInit() {
    // this.postService.selectedPost.subscribe(post => {
    //   if (post.id !== null) {
    //     this.id = post.id;
    //     this.foodName = post.foodName;
    //     this.rating = post.rating;
    //     this.restaurant = post.restaurant;
    //     this.user = post.user;
    //     this.date = post.date;
    //     this.newPost = false;
    //   }
    // });
  }

}
