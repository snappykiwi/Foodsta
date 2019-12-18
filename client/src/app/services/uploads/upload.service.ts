import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PostService } from '../posts/post.service';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  constructor(private http: HttpClient,
    private postService: PostService) { }

  imageUpload(picture: FormData) {
    this.postService.openSnackBar("Post Uploading...", "Close");
    return this.http.post('/api/picUpload', picture);
  }
}
