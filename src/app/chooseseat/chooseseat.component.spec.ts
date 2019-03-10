import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseseatComponent } from './chooseseat.component';

describe('ChooseseatComponent', () => {
  let component: ChooseseatComponent;
  let fixture: ComponentFixture<ChooseseatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseseatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseseatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
