import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento.service'; // Asegúrate de tener este archivo
import { Evento } from '../../models/evento.models'; // Asegúrate de tener este archivo

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EventoComponent {
  events: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.listar().subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Error al cargar eventos:', err)
    });
  }

  toggleEstado(evento: Evento): void {
    evento.Estado = !evento.Estado;
    this.eventoService.cambiarEstado(evento).subscribe({
      next: () => console.log('Estado actualizado'),
      error: (err) => console.error('Error al actualizar estado:', err)
    });
  }

  irACrear(): void {
    this.router.navigate(['/admin/eventos/crear']);
  }

  irAEditar(id: number): void {
    this.router.navigate(['/admin/eventos/editar', id]);
  }

  irAEliminar(id: number): void {
    this.router.navigate(['/admin/eventos/eliminar', id]);
  }
}