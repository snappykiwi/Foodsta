import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/services/posts/post.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-photo-container',
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.scss']
})

export class PhotoContainerComponent {

  @Input() post: Post;
  @Input() posts;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private postService: PostService) { }


  ngOnInit() { }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      this.post = result;
    });
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );


}
