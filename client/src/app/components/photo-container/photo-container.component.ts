import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/posts/post.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../models/Post';
import { ThemeService } from 'src/app/services/themes/theme.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo-container',
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.scss'],
  providers: [NgbRatingConfig],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(
              '50ms',
              animate(
                '1000ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ],
})

export class PhotoContainerComponent {


  @Input() post: Post;
  @Input() posts;

  readonly = true;

  isDarkTheme: Observable<boolean>
  isProfilePage: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public auth: AuthService,
    private postService: PostService,
    private themeService: ThemeService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private config: NgbRatingConfig) { config.max = 5; }


  ngOnInit() {

    this.isDarkTheme = this.themeService.isDarkTheme;

    console.log(this.router.url);
    this.isProfilePage = (this.router.url === "/profile")
    console.log(this.isProfilePage);

  }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      this.post = result;
    });
  }


}
