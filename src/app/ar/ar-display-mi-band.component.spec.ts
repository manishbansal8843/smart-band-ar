import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArDisplayMiBandComponent } from './ar-display-mi-band.component';

describe('ArDisplayMiBandComponent', () => {
  let component: ArDisplayMiBandComponent;
  let fixture: ComponentFixture<ArDisplayMiBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArDisplayMiBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArDisplayMiBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
