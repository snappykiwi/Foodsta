import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Restaurant } from '../../models/Restaurant';
import { SearchService } from 'src/app/services/searches/search.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public hoursCollapsed = true;

  @Input() restaurant: Restaurant

  restaurantId: string = null
  currentRestaurant: Restaurant

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private searchService: SearchService) { 

      this.searchService.currentRestaurantSource.subscribe(restaurant => {
        this.currentRestaurant = restaurant;
        console.log(this.currentRestaurant);
      });

    }


  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.restaurantId = urlParameters['id'];
    });  

  }

}
