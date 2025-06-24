import { Routes } from '@angular/router';
import { LoginAdmComponent } from './login-adm/login-adm.component';
import { DashboardAdmComponent } from './dashboard-adm/dashboard-adm';
import { AlumnoComponent } from './alumno/alumno.component';
import { HorasSellosComponent } from './horas-sellos/horas-sellos.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';

export const routes: Routes = [
  {path: '', component: InicioComponent},
  { path: 'login', component: LoginAdmComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'horas-sellos', component: HorasSellosComponent },
  { path: 'dashboard', component: DashboardAdmComponent },
  { path: 'registro-horas', component: RegistroHorasComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/inicio' } 
];
