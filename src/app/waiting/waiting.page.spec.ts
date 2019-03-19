import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPage } from './waiting.page';

describe('WaitingPage', () => {
  let component: WaitingPage;
  let fixture: ComponentFixture<WaitingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
