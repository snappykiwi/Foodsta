import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { ProfileService } from '../profile/profile.service';
import { AuthService } from 'src/app/auth.service';

@Injectable()

export class ProfileResolver implements Resolve<any> {

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.profileService.getUserData.then(() => true);
    if (this.authService.userProfileSubject$) {
      return true
    }

  }

}