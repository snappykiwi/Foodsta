import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Restaurant } from '../../models/Restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurantId: string = null

  constructor(
    private route: ActivatedRoute, 
    private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.restaurantId = urlParameters['id'];
    });  
  }

}
