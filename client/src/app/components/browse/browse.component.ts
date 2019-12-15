import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';
import { SearchService } from '../../services/searches/search.service';
import { Search } from '../../models/Search';
import { Location } from '../../models/Location';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/posts/post.service';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})

export class BrowseComponent implements OnInit {

  // set variable to search interface
  restaurants: Search[] = [];
  posts: any[] = [];

  public latitude;
  public longitude;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private searchService: SearchService,
    private postService: PostService,
    private geolocationService: GeolocationService
  ) { }

  getRestaurants(search = "restaurants", latitude = this.latitude, longitude = this.longitude) {
    console.log(search, latitude, longitude);
    this.searchService.restaurantApiInfo(search, latitude, longitude).subscribe(restaurants => {
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

      setTimeout(() => {

        this.posts = posts;
      }, 1000);

    });

  }

  onSearch(search?: string) {

    if (search) {
      console.log("searching........");
      this.posts = [];

      this.latitude = this.geolocationService.latitudeSource.value;
      this.longitude = this.geolocationService.longitudeSource.value;

      this.getRestaurants(search);

      this.postService.getSearchPosts(search).subscribe((posts: any[]) => {
        this.posts = posts;
      });

    }
    else {
      console.log("getting posts and restaurants......");
      this.getPosts();
      this.getRestaurants();
    }
  };

  setLocationValues(location) {
    this.geolocationService.longitudeSource.next(location.lng);
    this.geolocationService.latitudeSource.next(location.lat);
    this.latitude = this.geolocationService.latitudeSource.value;
    this.longitude = this.geolocationService.longitudeSource.value;
  }

  getLocationResults() {
    console.log(this.geolocationService.gotLocation);
    console.log(this.geolocationService.gotLocation.value);

    if (!this.geolocationService.gotLocation.value) {

      this.geolocationService.getGeolocation().subscribe((location: Location) => {
        console.log(location);
        this.setLocationValues(location.location);

        this.onSearch();
      });
    }
    else {
      this.geolocationService.getPosition().then(pos => {
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
        this.setLocationValues(pos);

        this.onSearch();
      });
    };

  };


  ngOnInit() {
    this.getPosts();

    this.getLocationResults();
  }

}
