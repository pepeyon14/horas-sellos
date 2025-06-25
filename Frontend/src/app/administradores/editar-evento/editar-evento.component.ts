import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventoService.getEventoPorId(id).subscribe({
      next: (res) => {
        /* ⬇️ recortamos a yyyy-MM-dd para <input type="date"> */
        res.Fecha = res.Fecha?.slice(0, 10);
        this.evento = res;
      },
      error: (err) => console.error('Error al cargar evento', err)
    });
  }

  actualizarEvento(): void {
    /* opcional: si tu backend requiere la hora en 00:00:00 */
    const body: Evento = {
      ...this.evento,
      Fecha: this.evento.Fecha + ' 00:00:00'     // <-- o deja solo la fecha si tu BD lo acepta
    };

    this.eventoService.editarEvento(this.evento.ID_Evento!, body).subscribe({
      next: () => this.router.navigate(['/admin/evento']),
      error: (err) => console.error('Error al actualizar evento', err)
    });
  }
}