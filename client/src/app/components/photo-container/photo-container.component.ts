import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photo-container',
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.scss']
})

export class PhotoContainerComponent {

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) { }

  ngOnInit() {
    let obs = this.http.get('/api/test');
    obs.subscribe((res) => {
      console.log(res);
    })
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  name = "Emily"

  masonryImages = [
    { image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", label: "Greek Salad", rating: "7", restaurant: "Giovanni's", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", label: "Blueberry Pancakes with Oranges", rating: "8", restaurant: "IHOP", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Pizza", rating: "9", restaurant: "Sal's Pizza" },
    { image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Burger", rating: "10", restaurant: "Burger King", link: "http://www.fiveguys.com/menu"},
    { image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", label: "Soup", rating: "9", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80", label: "French Toast", rating: "8", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Steak", rating: "7", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=953&q=80", label: "Breakfast", rating: "6", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Pesto Pasta", rating: "9", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", label: "Greek Salad", rating: "7", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", label: "Blueberry Pancakes with Oranges", rating: "8", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Pizza", rating: "7", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Burger", rating: "6", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80", label: "Soup", rating: "8", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80", label: "French Toast", rating: "2", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Steak", rating: "8", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=953&q=80", label: "Breakfast", rating: "7", restaurant: "Idk", link: "http://www.fiveguys.com/menu" },
    { image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", label: "Pesto Pasta", rating: "7", restaurant: "Idk", link: "http://www.fiveguys.com/menu" }

  ]


}
