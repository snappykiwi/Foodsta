import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Location } from '@angular/common';
import { Restaurant } from '../../models/Restaurant';
import { SearchService } from 'src/app/services/searches/search.service';
import { PostService } from 'src/app/services/posts/post.service';
import { PhotoContainerComponent } from '../photo-container/photo-container.component'
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/themes/theme.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  animations: [
    [
      trigger('fadeInCollapse', [
        transition(':enter', [
          style({ opacity: '0', transform: 'translateY(-40px)', height: '0px', overflow: 'hidden' }),
          animate('.4s', style({ opacity: '1', transform: 'translateY(0px)', height: '*' })),
        ]),
        transition(':leave', [
          animate('.4s', style({ opacity: '0', transform: 'translateY(-40px)', height: '0px', overflow: 'hidden' }))
        ])
      ]),
    ]
  ]
})
export class RestaurantComponent implements OnInit {

  posts: any[] = [];

  public hoursCollapsed = true;

  isDarkTheme: Observable<boolean>

  @Input() restaurant: Restaurant

  restaurantId: string = null;
  currentRestaurant: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchService: SearchService,
    private postService: PostService,
    private themeService: ThemeService) { }


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

    this.isDarkTheme = this.themeService.isDarkTheme;

    this.route.params.forEach((urlParameters) => {
      this.restaurantId = urlParameters['id'];
    });

    this.setCurrentRestaurant(this.restaurantId);
    this.setRestaurantPgInfo();
  }

}
