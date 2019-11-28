import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/posts/post.service';
import { Post } from 'src/app/models/Post';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/uploads/upload.service';

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
  
  post : Post = {
    image : "",
    title : "",
    caption : "",
    cuisine : "",
    category : "",
    gf : "",
    vegan : "",
    vegetarian : "",
    rating : 0,
    restaurant: "",
    user : ""
  };
  
  image = "";
  imageObj: File;
  imgURL: any;

  constructor(
    private postService: PostService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.postService.getPost(this.post);
  }

  // this gets the posts from the db
  // needs to be added in html
  // not sure where you want it
  // to show that it works, I put it on line 49 so it loads with the component
  getPosts() {
    this.postService.getPost(this.post);
  }

  savePhoto() {
    console.log(this.post);
    this.postService.savePost(this.post);
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
    { value: 'Mexican', viewValue: 'Mexican' },
    { value: 'Thai', viewValue: 'Thai' },
    { value: 'Chinese', viewValue: 'Chinese' },
    { value: 'Italian', viewValue: 'Italian' },
    { value: 'American', viewValue: 'American' },
    { value: 'Fast Food', viewValue: 'Fast Food' },
    { value: 'Other', viewValue: 'Other' }
  ];

  foods: SelectOptions[] = [
    { value: 'Steak', viewValue: 'Steak' },
    { value: 'Pizza', viewValue: 'Pizza' },
    { value: 'Tacos', viewValue: 'Tacos' },
    { value: 'Burgers', viewValue: 'Burger' },
    { value: 'Salad', viewValue: 'Salad' },
    { value: 'Sandwich', viewValue: 'Sandwich' },
    { value: 'Soup', viewValue: 'Soup' },
    { value: 'Other', viewValue: 'Other' }
  ];

}
