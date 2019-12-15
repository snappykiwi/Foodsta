import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchService } from '../../services/searches/search.service'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(
              '50ms',
              animate(
                '1000ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('500ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})


export class ListComponent implements OnInit {


  restaurants: any;
  gettingRestaurants: boolean = false;

  public latitude;
  public longitude;


  constructor(private router: Router,
    public searchService: SearchService,
    public geolocationService: GeolocationService) { }

  ngOnInit() {
    this.restaurants = this.searchService.restaurantSource
  }


  goToRestaurantPg(clickedRestaurant: any) {

    this.searchService.getRestaurantDetails(clickedRestaurant.place_id).subscribe(currentRestaurant => {

      this.searchService.currentRestaurantSource.next(currentRestaurant);

    })

    this.searchService.currentRestaurantId.next(clickedRestaurant.place_id);

    this.router.navigate(['restaurant', clickedRestaurant.place_id]);
  };

  getLocation() {
    this.gettingRestaurants = true;
    this.geolocationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.geolocationService.longitudeSource.next(pos.lng);
      this.geolocationService.latitudeSource.next(pos.lat);
      this.latitude = this.geolocationService.latitudeSource.value;
      this.longitude = this.geolocationService.longitudeSource.value;

      this.getRestaurants();
    });

  }

  getRestaurants(search = "restaurants", latitude = this.latitude, longitude = this.longitude) {
    this.searchService.restaurantApiInfo(search, latitude, longitude).subscribe(restaurants => {
      console.log("restaurants : ", restaurants);
      console.log("input : ", search);
      this.gettingRestaurants = false;
      this.searchService.restaurantSource.next(restaurants);

    }, (err) => {
      console.log(err);
    });
  }


}
