import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArrayFormComponent } from './my-array-form.component';

describe('MyArrayFormComponent', () => {
  let component: MyArrayFormComponent;
  let fixture: ComponentFixture<MyArrayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyArrayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArrayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
