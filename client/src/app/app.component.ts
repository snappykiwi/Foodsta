import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {BottomNavItem} from 'ngx-bottom-nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'Foodsta';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    items: BottomNavItem[] = [
      {icon: 'home', label: 'Home', routerLink: '/browse'},
      {icon: 'add_a_photo', label: 'Add', routerLink: '/add-photo'},
      {icon: 'account_circle', label: 'Profile', routerLink: '/profile'},
    ];


  constructor(
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }

}
