import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRegistroHorasComponent } from './editar-registro-horas.component';

describe('EditarRegistroHorasComponent', () => {
  let component: EditarRegistroHorasComponent;
  let fixture: ComponentFixture<EditarRegistroHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRegistroHorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarRegistroHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
