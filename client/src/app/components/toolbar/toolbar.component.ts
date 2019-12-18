import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/app/services/themes/theme.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() sideNav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkTheme: Observable<boolean>
  darkTheme: boolean = true;


  constructor(
    public auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService) { }

  toggleDarkTheme() {
    this.darkTheme = !this.darkTheme
    this.themeService.setDarkTheme(!this.darkTheme);
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.toggleDarkTheme();
  }



}
