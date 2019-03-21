import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpicPage } from './editpic.page';

describe('EditpicPage', () => {
  let component: EditpicPage;
  let fixture: ComponentFixture<EditpicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
