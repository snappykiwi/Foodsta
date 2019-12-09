import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/themes/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isDarkTheme: Observable<boolean>

  constructor(private themeService: ThemeService) { }

  toggleDarkTheme(checked: boolean = true) {
    this.themeService.setDarkTheme(checked);
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.toggleDarkTheme(true);
  }



}
