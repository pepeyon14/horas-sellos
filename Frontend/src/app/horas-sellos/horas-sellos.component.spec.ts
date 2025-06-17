import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasSellosComponent } from './horas-sellos.component';

describe('HorasSellosComponent', () => {
  let component: HorasSellosComponent;
  let fixture: ComponentFixture<HorasSellosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorasSellosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasSellosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
