import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdm } from './dashboard-adm';

describe('DashboardAdm', () => {
  let component: DashboardAdm;
  let fixture: ComponentFixture<DashboardAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
