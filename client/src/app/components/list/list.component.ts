import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  restaurants = [
    {name: "Five Guys", id:"1", address: "somewhere", phoneNumber: "(603)455-1010", openingHour: "open some hours", priceLevel: "2", websiteUrl: "website"},
    {name: "Sal's Pizza", id:"2", address: "somewhere", phoneNumber: "(603)455-1010", openingHour: "open some hours", priceLevel: "2", websiteUrl: "website"},
    {name: "Hong Kong Taste", id:"3", address: "somewhere", phoneNumber: "(603)455-1010", openingHour: "open some hours", priceLevel: "2", websiteUrl: "website"},
    {name: "Olive Garden", id:"4", address: "somewhere", phoneNumber: "(603)455-1010", openingHour: "open some hours", priceLevel: "2", websiteUrl: "website"},
    {name: "Masa", id:"5", address: "somewhere", phoneNumber: "(603)455-1010", openingHour: "open some hours", priceLevel: "2", websiteUrl: "website"}
  ] 

  goToRestaurantPg(clickedRestaurant: Restaurant) {
    this.router.navigate(['restaurant', clickedRestaurant.id]);
  };
}
