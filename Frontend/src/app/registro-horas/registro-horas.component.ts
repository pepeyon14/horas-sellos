import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Asegúrate de que el Router esté importado

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-registro-horas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './registro-horas.component.html',
  styleUrl: './registro-horas.component.css'
})
export class RegistroHorasComponent implements OnInit {

  registroId: number | null = null;
  selectedEventoId: number | null = null;
  selectedRutAlumno: string = '';
  selectedRutAdministrativo: string = '';
  fechaInicio: Date | null = null;
  fechaTermino: Date | null = null;
  cantidadHorasOtorgadas: number | null = null;

  eventos: any[] = [
    { id: 1, nombre: 'Limpieza de Playa', cantidadHoras: 5, rutEncargado: '12.345.678-9' },
    { id: 2, nombre: 'Clases de Apoyo', cantidadHoras: 3, rutEncargado: '98.765.432-1' },
    { id: 3, nombre: 'Plantación de Árboles', cantidadHoras: 4, rutEncargado: '11.222.333-4' }
  ];

  alumnos: any[] = [
    { rut: '20.123.456-7', nombre: 'Juan Pérez' },
    { rut: '21.987.654-3', nombre: 'María González' },
    { rut: '22.444.555-1', nombre: 'Pedro Ramírez' }
  ];

  administrativos: any[] = [
    { rut: '12.345.678-9', nombre: 'Ana López' },
    { rut: '98.765.432-1', nombre: 'Carlos Ruiz' },
    { rut: '11.222.333-4', nombre: 'Sofía Díaz' }
  ];

  registrosHoras: any[] = [];
  displayedColumns: string[] = [
    'idHoraSello',
    'evento',
    'alumno',
    'administrativo',
    'fechaInicio',
    'fechaTermino',
    'cantidadHoras',
    'acciones'
  ];

  constructor(private router: Router) { } // Asegúrate de que el Router esté inyectado

  ngOnInit(): void {
    this.loadRegistrosHoras();
  }

  loadRegistrosHoras(): void {
    const simulatedData = [ // Datos simulados iniciales
      {
        idHoraSello: 101,
        idEvento: 1,
        rutAlumno: '20.123.456-7',
        rutAdministrativo: '12.345.678-9',
        fechaInicio: new Date('2024-07-20T10:00:00'),
        fechaTermino: new Date('2024-07-20T15:00:00'),
        cantidadHoras: 5
      },
      {
        idHoraSello: 102,
        idEvento: 2,
        rutAlumno: '21.987.654-3',
        rutAdministrativo: '98.765.432-1',
        fechaInicio: new Date('2024-08-05T15:00:00'),
        fechaTermino: new Date('2024-08-05T18:00:00'),
        cantidadHoras: 3
      }
    ];

    // Mapear los IDs a nombres para mostrar en la tabla (útil para la UI)
    this.registrosHoras = simulatedData.map(reg => ({
      ...reg,
      nombreEvento: this.eventos.find(e => e.id === reg.idEvento)?.nombre || 'Evento Desconocido',
      nombreAlumno: this.alumnos.find(a => a.rut === reg.rutAlumno)?.nombre || 'Alumno Desconocido',
      nombreAdministrativo: this.administrativos.find(adm => adm.rut === reg.rutAdministrativo)?.nombre || 'Admin Desconocido'
    }));
  }

  onEventoSelected(): void {
    if (this.selectedEventoId) {
      const selectedEvent = this.eventos.find(e => e.id === this.selectedEventoId);
      if (selectedEvent) {
        this.cantidadHorasOtorgadas = selectedEvent.cantidadHoras;
      }
    } else {
      this.cantidadHorasOtorgadas = null;
    }
  }

  onSubmitRegistroHorasForm(): void {
    const registroData = {
      idEvento: this.selectedEventoId,
      rutAlumno: this.selectedRutAlumno,
      rutAdministrativo: this.selectedRutAdministrativo,
      fechaInicio: this.fechaInicio,
      fechaTermino: this.fechaTermino,
      cantidadHoras: this.cantidadHorasOtorgadas
    };

    if (this.registroId) {
      console.log('Actualizando registro de horas con ID:', this.registroId, 'Datos:', registroData);
      this.registrosHoras = this.registrosHoras.map(reg =>
        reg.idHoraSello === this.registroId ? { ...reg, ...registroData, idHoraSello: this.registroId } : reg
      );
      alert('Registro de horas actualizado (simulado) exitosamente!');
    } else {
      console.log('Creando nuevo registro de horas:', registroData);
      const newId = this.registrosHoras.length > 0 ? Math.max(...this.registrosHoras.map(r => r.idHoraSello)) + 1 : 1;
      this.registrosHoras = [...this.registrosHoras, { ...registroData, idHoraSello: newId }];
      alert('Registro de horas creado (simulado) exitosamente!');
    }

    // --- ¡LÍNEAS AÑADIDAS/MODIFICADAS AQUÍ! ---
    // Volvemos a mapear para asegurarnos de que los nombres se muestren correctamente
    // para el nuevo/actualizado registro en la tabla.
    this.registrosHoras = this.registrosHoras.map(reg => ({
        ...reg,
        nombreEvento: this.eventos.find(e => e.id === reg.idEvento)?.nombre || 'Evento Desconocido',
        nombreAlumno: this.alumnos.find(a => a.rut === reg.rutAlumno)?.nombre || 'Alumno Desconocido',
        nombreAdministrativo: this.administrativos.find(adm => adm.rut === reg.rutAdministrativo)?.nombre || 'Admin Desconocido'
    }));
    this.registrosHoras = [...this.registrosHoras]; // Fuerza la actualización de la tabla de Angular Material
    // --- FIN LÍNEAS AÑADIDAS/MODIFICADAS ---

    this.resetForm();
  }

  editRegistroHoras(registro: any): void {
    console.log('Cargando registro para edición:', registro);
    this.registroId = registro.idHoraSello;
    this.selectedEventoId = registro.idEvento;
    this.selectedRutAlumno = registro.rutAlumno;
    this.selectedRutAdministrativo = registro.rutAdministrativo;
    this.fechaInicio = new Date(registro.fechaInicio);
    this.fechaTermino = new Date(registro.fechaTermino);
    this.cantidadHorasOtorgadas = registro.cantidadHoras;
  }

  deleteRegistroHoras(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este registro de horas?')) {
      console.log('Eliminando registro de horas con ID:', id);
      this.registrosHoras = this.registrosHoras.filter(reg => reg.idHoraSello !== id);
      alert('Registro de horas eliminado (simulado).');

      // --- ¡LÍNEA AÑADIDA AQUÍ! ---
      this.registrosHoras = [...this.registrosHoras]; // Fuerza la actualización de la tabla
      // --- FIN LÍNEA AÑADIDA ---
    }
  }

  resetForm(): void {
    this.registroId = null;
    this.selectedEventoId = null;
    this.selectedRutAlumno = '';
    this.selectedRutAdministrativo = '';
    this.fechaInicio = null;
    this.fechaTermino = null;
    this.cantidadHorasOtorgadas = null;
  }

  // Métodos para obtener el nombre completo desde el Rut (para mostrar en la tabla si no están ya en el objeto)
  getAlumnoNombre(rut: string): string {
    return this.alumnos.find(a => a.rut === rut)?.nombre || 'Desconocido';
  }

  getEventoNombre(id: number): string {
    return this.eventos.find(e => e.id === id)?.nombre || 'Desconocido';
  }

  getAdministrativoNombre(rut: string): string {
    return this.administrativos.find(a => a.rut === rut)?.nombre || 'Desconocido';
  }

  // Método para navegar de vuelta al dashboard de admin
  goToAdminDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}