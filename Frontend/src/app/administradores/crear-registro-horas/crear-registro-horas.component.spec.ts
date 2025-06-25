import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistroHorasComponent } from './crear-registro-horas.component';

describe('CrearRegistroHorasComponent', () => {
  let component: CrearRegistroHorasComponent;
  let fixture: ComponentFixture<CrearRegistroHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRegistroHorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearRegistroHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
