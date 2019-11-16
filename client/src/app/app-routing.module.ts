import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { BrowseComponent } from './browse/browse.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { MyArrayFormComponent } from './my-array-form/my-array-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'browse', component: BrowseComponent },
  { path: 'add-photo', component: AddPhotoComponent },
  { path: 'my-array-form', component: MyArrayFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
