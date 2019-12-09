import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  public darkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme = this.darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean = true): void {
    this.darkTheme.next(isDarkTheme);
  }


  constructor() { }
}
