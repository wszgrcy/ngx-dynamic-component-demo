import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibwcComponent } from './libwc.component';

describe('LibwcComponent', () => {
  let component: LibwcComponent;
  let fixture: ComponentFixture<LibwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
