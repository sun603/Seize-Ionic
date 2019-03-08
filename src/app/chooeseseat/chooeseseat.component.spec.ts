import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooeseseatComponent } from './chooeseseat.component';

describe('ChooeseseatComponent', () => {
  let component: ChooeseseatComponent;
  let fixture: ComponentFixture<ChooeseseatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooeseseatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooeseseatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
