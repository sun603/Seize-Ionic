import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooselibraryComponent } from './chooselibrary.component';

describe('ChooselibraryComponent', () => {
  let component: ChooselibraryComponent;
  let fixture: ComponentFixture<ChooselibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooselibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooselibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
