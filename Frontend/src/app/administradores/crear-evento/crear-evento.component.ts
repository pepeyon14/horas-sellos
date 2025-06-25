import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.models';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-evento.component.html',
})
export class CrearEventoComponent {
  evento: Evento = {
    Nombre: '',
    Descripcion: null,
    RutEncargado: '',
    Fecha: '',
    Tipo: 0,
    Publico: 0,
    CantidadHoras: 0,
    Estado: 1
  };

  constructor(private eventoService: EventoService, private router: Router) {}

  crearEvento() {
    this.eventoService.crearEvento(this.evento).subscribe({
      next: () => this.router.navigate(['/admin/evento']),
      error: (err) => console.error('Error al crear evento', err)
    });
  }
}