import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Restaurant } from '../../models/Restaurant';
import { SearchService } from 'src/app/services/searches/search.service';
import { PostService } from 'src/app/services/posts/post.service';
import { PhotoContainerComponent } from '../photo-container/photo-container.component'

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  posts: any[] = [];

  public hoursCollapsed = true;

  @Input() restaurant: Restaurant

  restaurantId: string = null;
  currentRestaurant: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchService: SearchService,
    private postService: PostService) { }


  getRestPosts(restaurantId) {

    this.postService.getRestPosts(restaurantId).subscribe((posts: any[]) => {
      this.posts = posts;
      console.log(this.posts);
    });

  };


  setRestaurantPgInfo() {

    this.searchService.currentRestaurantSource.subscribe(restaurant => {
      console.log(restaurant);

      this.currentRestaurant = restaurant;

      this.getRestPosts(this.searchService.currentRestaurantId.value);

    });
  };


  setCurrentRestaurant(currentRestaurantId) {

    if (currentRestaurantId !== this.searchService.currentRestaurantId) {

      this.searchService.getRestaurantDetails(currentRestaurantId).subscribe(currentRestaurant => {

        this.searchService.currentRestaurantSource.next(currentRestaurant);

      });

      this.searchService.currentRestaurantId.next(currentRestaurantId);
    };

  };


  ngOnInit() {

    this.route.params.forEach((urlParameters) => {
      this.restaurantId = urlParameters['id'];
    });

    this.setCurrentRestaurant(this.restaurantId);
    this.setRestaurantPgInfo();
  }

}
