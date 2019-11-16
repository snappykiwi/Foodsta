import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'

@Component({
  selector: 'app-my-array-form',
  templateUrl: './my-array-form.component.html',
  styleUrls: ['./my-array-form.component.scss']
})
export class MyArrayFormComponent implements OnInit {

  firstFormGroup = new FormGroup({
    firstControl: new FormControl('')
  });
  secondFormGroup = new FormGroup({
    secondControl: new FormControl('')
  });

  constructor() {}

  ngOnInit() {}

}
