import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchService } from '../../services/searches/search.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  restaurants = []

  constructor(private router: Router,
    private searchService: SearchService) { }

  ngOnInit() { }

  goToRestaurantPg(clickedRestaurant: Restaurant) {
    console.log(clickedRestaurant);

    this.searchService.getRestaurantDetails(clickedRestaurant.id).subscribe(currentRestaurant => {

      this.searchService.currentRestaurantSource.next(clickedRestaurant);
      console.log(clickedRestaurant);
    })

    this.router.navigate(['restaurant', clickedRestaurant.id]);
  };
}
