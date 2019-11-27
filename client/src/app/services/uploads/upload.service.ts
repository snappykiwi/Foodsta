import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private http: HttpClient) { }

  imageUpload(picture: FormData) {
    console.log('image uploading');
    return this.http.post('http://localhost:3000/api/picUpload', picture);
  }
}
