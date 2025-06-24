import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- ¡IMPORTA EL ROUTER AQUÍ!
import { AuthService } from '../auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard-adm',
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
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './dashboard-adm.html',
  styleUrl: './dashboard-adm.css'
})
export class DashboardAdmComponent implements OnInit {

  eventId: number | null = null;
  eventName: string = '';
  eventDescription: string = '';
  eventEncargadoRut: string = '';
  eventDate: Date | null = null;
  eventType: boolean = false;
  eventPublic: boolean = false;
  eventHours: number | null = null;
  eventStatus: boolean = false;

  events: any[] = [];
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'rutEncargado',
    'fecha',
    'tipo',
    'publico',
    'cantidadHoras',
    'estado',
    'acciones'
  ];

constructor(private router: Router, private authService: AuthService) { }  ngOnInit(): void {
    this.loadEvents();
  }
  
  goToRegistroHoras(): void {
    this.router.navigate(['/registro-horas']);
  }

   logout(): void {
    this.authService.logout(); // Llama al método logout de tu AuthService
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }

  loadEvents(): void {
    
    this.events = [
      {
        id: 1,
        nombre: 'Limpieza de Playa',
        descripcion: 'Ayuda a limpiar la playa local',
        rutEncargado: '12.345.678-9',
        fecha: new Date('2024-07-20T10:00:00'),
        tipo: true,
        publico: true,
        cantidadHoras: 5,
        estado: true
      },
      
      {
        id: 2,
        nombre: 'Clases de Apoyo',
        descripcion: 'Refuerzo de matemáticas para primaria',
        rutEncargado: '98.765.432-1',
        fecha: new Date('2024-08-05T15:00:00'),
        tipo: false,
        publico: false,
        cantidadHoras: 3,
        estado: false
      },
      {
        id: 3,
        nombre: 'Plantación de Árboles',
        descripcion: 'Reforestación en parque urbano',
        rutEncargado: '11.222.333-4',
        fecha: new Date('2024-09-10T09:00:00'),
        tipo: true,
        publico: true,
        cantidadHoras: 4,
        estado: true
      }
    ];
  }

  onSubmitEventForm(): void {
    const eventData = {
      nombre: this.eventName,
      descripcion: this.eventDescription,
      rutEncargado: this.eventEncargadoRut,
      fecha: this.eventDate,
      tipo: this.eventType,
      publico: this.eventPublic,
      cantidadHoras: this.eventHours,
      estado: this.eventStatus
    };

    if (this.eventId) {
      console.log('Actualizando evento con ID:', this.eventId, 'Datos:', eventData);
      this.events = this.events.map(event =>
        event.id === this.eventId ? { ...event, ...eventData, id: this.eventId } : event
      );
      alert('Evento actualizado (simulado) exitosamente!');
    } else {
      console.log('Creando nuevo evento:', eventData);
      const newId = this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) + 1 : 1;
      this.events = [...this.events, { id: newId, ...eventData }];
      alert('Evento creado (simulado) exitosamente!');
    }

    this.resetForm();
  }

  editEvent(event: any): void {
    console.log('Cargando evento para edición:', event);
    this.eventId = event.id;
    this.eventName = event.nombre;
    this.eventDescription = event.descripcion;
    this.eventEncargadoRut = event.rutEncargado;
    this.eventDate = new Date(event.fecha);
    this.eventType = event.tipo;
    this.eventPublic = event.publico;
    this.eventHours = event.cantidadHoras;
    this.eventStatus = event.estado;
  }

  deleteEvent(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      console.log('Eliminar evento con ID:', id);
      this.events = this.events.filter(e => e.id !== id);
      alert('Evento eliminado (simulado).');
    }
  }

  resetForm(): void {
    this.eventId = null;
    this.eventName = '';
    this.eventDescription = '';
    this.eventEncargadoRut = '';
    this.eventDate = null;
    this.eventType = false;
    this.eventPublic = false;
    this.eventHours = null;
    this.eventStatus = false;
  }

  toggleEventStatus(event: any): void {
    const newStatus = !event.estado;
    event.estado = newStatus;

    console.log(`Estado del evento "${event.nombre}" (ID: ${event.id}) cambiado a: ${newStatus ? 'Aprobado' : 'Rechazado'}`);
    alert(`Estado de "${event.nombre}" cambiado a ${newStatus ? 'Aprobado' : 'Rechazado'}`);
  }
}