import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/posts/post.service';
import { Post } from 'src/app/models/Post';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/uploads/upload.service';
import * as AWS from 'aws-sdk';

export interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements OnInit {

  image = "";

  // starRating : RatingComponent

  post : Post = {
    image : "",
    title : "",
    restaurant: "",
    cuisine : "",
    category : "",
    rating : 0,
    user : ""
  };
  
  // newPost : boolean = true;

  constructor(
    private postService: PostService,
    private uploadService: UploadService) {}

  // selectedFile: File
  imageObj: File;
 // imageUrl: string;

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]
  // }

  uploadPost() {
    console.log(this.post);
    this.postService.uploadPost(this.post);
  }


  onImagePicked(event: Event): void {
   const FILE = (event.target as HTMLInputElement).files[0];
   this.imageObj = FILE;
   console.log(this.imageObj);
   console.log(event);
  }

  onImageUpload() {
   const imageForm = new FormData();
   imageForm.append('picture', this.imageObj);
   this.uploadService.imageUpload(imageForm).subscribe(res => {
     this.post.image = res['Location'];
     console.log(this.post.image);
   });
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
