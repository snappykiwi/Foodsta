import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RatingComponent } from '../rating/rating.component';

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

  // onUpload() {
  //   // this.http is the injected HttpClient
  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  //   this.http.post('my-backend.com/file-upload', uploadData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //     .subscribe(event => {
  //       console.log(event); // handle event here
  //     });
  // }


  categories: SelectOptions[] = [
    {value: 'mexican-0', viewValue: 'Mexican'},
    {value: 'thai-1', viewValue: 'Thai'},
    {value: 'chinese-2', viewValue: 'Chinese'},
    {value: 'italian-3', viewValue: 'Italian'},
    {value: 'american-4', viewValue: 'American'},
    {value: 'fast-food-5', viewValue: 'Fast Food'},
    {value: 'other-6', viewValue: 'Other'}
  ];

  // meals: SelectOptions[] = [
  //   {value: 'breakfast-0', viewValue: 'Breakfast'},
  //   {value: 'lunch-1', viewValue: 'Lunch'},
  //   {value: 'appetizer-2', viewValue: 'Appetizer'},
  //   {value: 'dinner-3', viewValue: 'Dinner'},
  //   {value: 'side-4', viewValue: 'Side'},
  //   {value: 'dessert-5', viewValue: 'Dessert'},
  //   {value: 'drink-6', viewValue: 'Drink'},
  //   {value: 'other-6', viewValue: 'Other'}
  // ];

  foods: SelectOptions[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'burger-3', viewValue: 'Burger'},
    {value: 'salad-4', viewValue: 'Salad'},
    {value: 'sandwich-5', viewValue: 'Sandwich'},
    {value: 'soup-6', viewValue: 'Soup'},
    {value: 'other-7', viewValue: 'Other'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
