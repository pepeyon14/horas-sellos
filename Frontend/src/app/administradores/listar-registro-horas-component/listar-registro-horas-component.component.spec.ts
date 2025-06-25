import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegistroHorasComponentComponent } from './listar-registro-horas-component.component';

describe('ListarRegistroHorasComponentComponent', () => {
  let component: ListarRegistroHorasComponentComponent;
  let fixture: ComponentFixture<ListarRegistroHorasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarRegistroHorasComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarRegistroHorasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
