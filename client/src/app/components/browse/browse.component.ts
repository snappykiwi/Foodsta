import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SearchService } from '../../services/searches/search.service';
import { Search } from '../../models/Search';
import { Location } from '../../models/Location';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/posts/post.service';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { ThemeService } from 'src/app/services/themes/theme.service';
import { fadeCollapse } from 'src/app/animations';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  animations: [fadeCollapse]
})

export class BrowseComponent implements OnInit {

  // set variable to search interface
  restaurants: Search[] = [];
  posts: any[] = [];

  sortGF: boolean = false;
  sortVegan: boolean = false;
  sortVegetarian: boolean = false;

  public filtersCollapsed = true;

  isDarkTheme: Observable<boolean>
  loadingPosts: boolean = true;

  public latitude;
  public longitude;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private searchService: SearchService,
    private postService: PostService,
    private geolocationService: GeolocationService,
    private themeService: ThemeService
  ) { }

  getRestaurants(search = "restaurants", latitude = this.latitude, longitude = this.longitude) {
    this.searchService.restaurantApiInfo(search, latitude, longitude).subscribe(restaurants => {

      this.searchService.restaurantSource.next(restaurants);

    }, (err) => {
      console.log(err);
    });
  }

  getPosts() {
    this.loadingPosts = true;

    this.postService.getPosts().subscribe((posts: any[]) => {

      setTimeout(() => {
        this.loadingPosts = false;

        this.posts = posts;
      }, 500);

    });

  }

  onSearch(search?: string) {

    if (search) {
      this.posts = [];

      this.latitude = this.geolocationService.latitudeSource.value;
      this.longitude = this.geolocationService.longitudeSource.value;

      this.getRestaurants(search);

      this.postService.getSearchPosts(search).subscribe((posts: any[]) => {
        this.posts = posts;
      });

    }
    else {
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

    if (!this.geolocationService.gotLocation.value) {

      this.geolocationService.getGeolocation().subscribe((location: Location) => {
        this.setLocationValues(location.location);

        this.onSearch();
      });
    }
    else {
      this.geolocationService.getPosition().then(pos => {
        this.setLocationValues(pos);

        this.onSearch();
      });
    };

  };

  filterPosts(event) {

    this.postService.getFilteredPosts(this.sortGF, this.sortVegan, this.sortVegetarian).subscribe((posts: any[]) => {

      this.posts = posts;
    });
  }


  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;

    this.getPosts();

    this.getLocationResults();
  }

}
