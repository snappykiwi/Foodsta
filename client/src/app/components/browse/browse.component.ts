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

  searches : Search[];

  constructor(
    private breakpointObserver : BreakpointObserver,
    private searchService : SearchService,
    private postService: PostService
    ) { }


  onSearch(search : string) {

    this.searchService.getSearch(search).subscribe(searches => {
      console.log("searches : ", searches);
      console.log("input : ", search);

      this.searchService.restaurantSource.next(searches);

    }, (err) => {
      console.log(err);
    })

  }

  ngOnInit() {
    this.onSearch("restaurants");
    this.postService.getPost();
   }

}
