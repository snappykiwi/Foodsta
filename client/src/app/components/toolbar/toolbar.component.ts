import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/app/services/themes/theme.service';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService) { }

  toggleDarkTheme(checked: boolean = true) {
    this.themeService.setDarkTheme(checked);
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.toggleDarkTheme(true);
  }



}
