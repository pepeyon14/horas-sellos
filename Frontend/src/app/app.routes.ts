import { Routes } from '@angular/router';
import { LoginAdmComponent } from './administradores/login-adm/login-adm.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { HorasSellosComponent } from './alumno/horas-sellos/horas-sellos.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './administradores/menu/menu.component';
import { EventoComponent } from './administradores/evento/evento.component';

export const routes: Routes = [
  // Home
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },

  // Rutas para Alumnos y Administradores
  { path: 'inicio', component: InicioComponent },

  // Rutas para Alumnos
  { path: 'alumno', component: AlumnoComponent },
  { path: 'horas-sellos', component: HorasSellosComponent },
  { path: 'horas-sellos/:rut', component: HorasSellosComponent },

  // Rutas para Administradores
  { path: 'login', component: LoginAdmComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'evento', component: EventoComponent },

  { path: '**', redirectTo: 'inicio' }
];
