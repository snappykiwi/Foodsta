import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowseComponent } from './components/browse/browse.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './components/rating/rating.component';
import { PhotoContainerComponent } from './components/photo-container/photo-container.component';
import { BottomNavModule } from 'ngx-bottom-nav';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { PostService } from './services/posts/post.service';
import { CommonModule } from '@angular/common';
import { SearchService } from './services/searches/search.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    BrowseComponent,
    AddPhotoComponent,
    RatingComponent,
    PhotoContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    BottomNavModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    SlimLoadingBarModule,
    CommonModule
  ],
  providers: [
    PostService,
    SearchService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
