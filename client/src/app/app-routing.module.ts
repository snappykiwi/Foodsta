import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { BrowseComponent } from './components/browse/browse.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { ProfileResolver } from './services/profile-resolver/profile-resolver.service';
import { ProfileService } from './services/profile/profile.service';

import { NotFoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      token: ProfileResolver
    },
    data: { animation: 'ProfilePage' }
  },
  { path: 'home', component: BrowseComponent, data: { animation: 'HomePage' } },
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard], data: { animation: 'AddPage' } },
  { path: 'restaurant/:id', component: RestaurantComponent, data: { animation: 'RestaurantPage' } },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProfileResolver]
})
export class AppRoutingModule { }
