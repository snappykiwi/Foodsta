import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BottomNavItem } from 'ngx-bottom-nav';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

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
    private breakpointObserver: BreakpointObserver,
    private loadingBar: SlimLoadingBarService,
    private router: Router
    ) { 
      this.router.events.subscribe((event: Event) => {
        this.navigationInterceptor(event);
      });
    }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }

  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }

}
