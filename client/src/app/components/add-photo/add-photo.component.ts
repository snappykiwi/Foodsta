import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/posts/post.service';
import { Post } from 'src/app/models/Post';
import { CommonModule } from '@angular/common';

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
    title : "",
    restaurant: "",
    cuisine : "",
    category : "",
    rating : 0,
    user : ""
  };

  constructor(private postService : PostService) { }

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  uploadPost() {
    console.log(this.post);
    this.postService.uploadPost(this.post);
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

  }

}
