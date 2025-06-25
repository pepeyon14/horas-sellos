import { Routes } from '@angular/router';
import { LoginAdmComponent } from './administradores/login-adm/login-adm.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { HorasSellosComponent } from './alumno/horas-sellos/horas-sellos.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './administradores/menu/menu.component';
import { CrearEventoComponent } from './administradores/crear-evento/crear-evento.component';
import { EditarEventoComponent } from './administradores/editar-evento/editar-evento.component';
import { ListarAlumnoComponent } from './administradores/listar-alumno/listar-alumno.component';
import { CrearAlumnoComponent } from './administradores/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './administradores/editar-alumno/editar-alumno.component';
import { ListarAdmComponent } from './administradores/listar-adm/listar-adm.component';
import { ListarEncargadoComponent } from './administradores/listar-encargado/listar-encargado.component';
import { CrearEncargadoComponent } from './administradores/crear-encargado/crear-encargado.component';
import { EditarEncargadoComponent } from './administradores/editar-encargado/editar-encargado.component';
import { ListarEventoComponent } from './administradores/listar-evento/evento.component';
import { ListarRegistroHorasComponent } from './administradores/listar-registro-horas-component/listar-registro-horas-component.component';
import { CrearRegistroHorasComponent } from './administradores/crear-registro-horas/crear-registro-horas.component';
import { EditarRegistroHorasComponent } from './administradores/editar-registro-horas/editar-registro-horas.component';

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
  { path: 'admin/evento', component: ListarEventoComponent },
  { path: 'admin/eventos/crear', component: CrearEventoComponent },
  { path: 'admin/eventos/editar/:id', component: EditarEventoComponent },
  { path: 'admin/alumnos', component: ListarAlumnoComponent },
  { path: 'admin/alumnos/crear', component: CrearAlumnoComponent},
  { path: 'admin/alumnos/editar/:rut', component: EditarAlumnoComponent },
  { path: 'admin/administrativos', component: ListarAdmComponent},
  { path: 'admin/encargados', component: ListarEncargadoComponent},
  { path: 'admin/encargados/crear', component: CrearEncargadoComponent},
  { path: 'admin/encargados/editar/:rut', component: EditarEncargadoComponent},
  { path: 'admin/registro-horas', component: ListarRegistroHorasComponent },
  { path: 'admin/registro-horas/crear', component: CrearRegistroHorasComponent},
  { path: 'admin/registro-horas/editar/:id', component: EditarRegistroHorasComponent},

  { path: '**', redirectTo: 'inicio' }
];
