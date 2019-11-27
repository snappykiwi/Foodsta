import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PhotoContainerComponent } from '../photo-container/photo-container.component';
import { SearchService } from '../../services/searches/search.service';
import { Search } from '../../models/Search';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})

export class BrowseComponent implements OnInit {

  // search : Search = {
  //   name: "",
  //   address: "",
  //   phoneNumber: "",
  //   openingHour: "",
  //   priceLevel: "",
  //   websiteUrl: ""
  // }

  searches : Search[];

  constructor(
    private breakpointObserver : BreakpointObserver,
    private searchService : SearchService
    ) { }

  ngOnInit() {
    this.searchService.getSearch().subscribe(searches => {
      console.log(searches);
    }, (err) => {
      console.log(err);
    })
  }

  // getSearch() {
  //   console.log(this.search);
  //   this.searchService.getSearch(this.search);
  // }

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

}
