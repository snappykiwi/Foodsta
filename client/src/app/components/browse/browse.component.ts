import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';
import { SearchService } from '../../services/searches/search.service';
import { Search } from '../../models/Search';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})

export class BrowseComponent implements OnInit {

  // set variable to search interface
  restaurants: Search[] = [];
  posts: any[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private searchService: SearchService,
    private postService: PostService
  ) { }

  getRestaurants(search = "restaurants") {
    this.searchService.restaurantApiInfo(search).subscribe(restaurants => {
      console.log("restaurants : ", restaurants);
      console.log("input : ", search);

      this.searchService.restaurantSource.next(restaurants);

    }, (err) => {
      console.log(err);
    });
  }

  getPosts() {
    console.log(this.posts);
    this.postService.getPosts().subscribe((posts: any[]) => {
      console.log(posts);
      this.posts = posts;
    });

  }

  onSearch(search: string) {

    if (search) {
      this.posts = [];

      this.getRestaurants(search);

      this.postService.getSearchPosts(search).subscribe((posts: any[]) => {
        this.posts = posts;
      });

    }
    else {
      this.getPosts();
      this.getRestaurants();
    }
  }


  ngOnInit() {
    this.onSearch("restaurants");
    this.getPosts();
  }

}
