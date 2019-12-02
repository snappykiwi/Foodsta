import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private postService: PostService
    ) { }

  ngOnInit() { }

}
