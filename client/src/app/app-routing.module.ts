import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { BrowseComponent } from './components/browse/browse.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: BrowseComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
