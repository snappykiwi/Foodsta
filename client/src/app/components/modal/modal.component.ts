import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Post } from '../../models/Post';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers : [NgbRatingConfig]
})
export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private config: NgbRatingConfig,
    @Inject(MAT_DIALOG_DATA) public post : Post)
    { 
      config.max = 5;
      config.readonly = true;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

}
