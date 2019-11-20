import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/post.service';

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

  id : string;
  foodName : string;
  rating : number;
  restaurant : string;
  user : string;
  date : any;
  newPost : boolean = true;

  addPhotoFormGroup = new FormGroup({
    photoControl: new FormControl('')
  });

  detailsFormGroup = new FormGroup({
    detailsControl1: new FormControl(''),
    detailsControl2: new FormControl(''),
    detailsControl3: new FormControl('')
  });

  ratingsFormGroup = new FormGroup({
    ratingsControl: new FormControl('')
  });

  reviewFormGroup = new FormGroup({
    reviewControl: new FormControl('')
  });

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
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

  constructor(private postService : PostService) { }

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
