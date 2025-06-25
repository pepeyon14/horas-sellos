import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.models';

@Component({
  selector: 'app-listar-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ]
})
export class ListarEventoComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) {}

  eliminarEvento(id: number) {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;

    this.eventoService.eliminarEvento(id).subscribe({
      next: () => {
        // quita el elemento del arreglo local
        this.eventos = this.eventos.filter((e) => e.ID_Evento !== id);
      },
      error: (err) => console.error('Error al eliminar evento', err),
    });
  }

  ngOnInit() {
    this.eventoService.getEventos().subscribe({
      next: (res) => this.eventos = res,
      error: (err) => console.error('Error al listar eventos', err)
    });
  }
}