import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { CommonModule } from '@angular/common';
import * as AWS from 'aws-sdk';

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

  image=""
  // starRating : RatingComponent

  post : Post = {
    image : "",
    foodName : "",
    restaurant: "",
    cuisine : "",
    category : "",
    rating : 0,
    user : "",
    date : new Date()
  };
  
  // newPost : boolean = true;

  constructor(private postService : PostService) {

  }

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  savePhoto() {
    console.log(this.post);

    this.postService.savePost(this.post);
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


  // fileEvent(fileInput: any) {
  //   const AWSService = AWS;
  //   const region = "us-east-1";
  //   const bucketName = 'test-bucket5643';
  //   const IdentityPoolId = '<insert your identity pool id>';
  //   const file = fileInput.target.files[0];
  // //Configures the AWS service and initial authorization
  //   AWSService.config.update({
  //     region: region,
  //     credentials: new AWSService.CognitoIdentityCredentials({
  //       IdentityPoolId: IdentityPoolId
  //     })
  //   });
  // //adds the S3 service, make sure the api version and bucket are correct
  //   const s3 = new AWSService.S3({
  //     apiVersion: '2006-03-01',
  //     params: { Bucket: bucketName}
  //   });
  // //I store this in a variable for retrieval later
  //   this.image = file.name;
  //   s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
  //    if (err) {
  //      console.log(err, 'there was an error uploading your file');
  //    }
  //  });
  // }

}
