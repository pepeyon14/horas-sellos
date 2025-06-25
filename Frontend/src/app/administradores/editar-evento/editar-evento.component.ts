import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Import FormsModule for template-driven forms
})
export class EditarEventoComponent implements OnInit {
  evento: Evento = {
    ID_Evento: 0,
    Nombre: '',
    Descripcion: null,
    RutEncargado: '',
    Fecha: '',
    Tipo: 0,
    Publico: 0,
    CantidadHoras: 0,
    Estado: 1
  };

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventoService.getEventoPorId(id).subscribe({
      next: (res) => this.evento = res,
      error: (err) => console.error('Error al cargar evento', err)
    });
  }

  actualizarEvento() {
    this.eventoService.editarEvento(this.evento.ID_Evento!, this.evento).subscribe({
      next: () => this.router.navigate(['/admin/eventos']),
      error: (err) => console.error('Error al actualizar evento', err)
    });
  }
}