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
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})


export class ListComponent implements OnInit {


  restaurants: any;

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

    this.geolocationService.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });

  }


}
