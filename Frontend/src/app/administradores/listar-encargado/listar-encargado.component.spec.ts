import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEncargadoComponent } from './listar-encargado.component';

describe('ListarEncargadoComponent', () => {
  let component: ListarEncargadoComponent;
  let fixture: ComponentFixture<ListarEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEncargadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
