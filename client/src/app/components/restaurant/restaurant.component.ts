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

  restaurantId: string = null
  currentRestaurant: Restaurant

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchService: SearchService,
    private postService: PostService) {

    this.searchService.currentRestaurantSource.subscribe(restaurant => {
      this.currentRestaurant = restaurant;

      this.postService.getRestPosts(restaurant).subscribe((posts: any[]) => {
        this.posts = posts;
      })

      console.log(this.currentRestaurant);
    });

  }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.restaurantId = urlParameters['id'];
    });

  }

}
