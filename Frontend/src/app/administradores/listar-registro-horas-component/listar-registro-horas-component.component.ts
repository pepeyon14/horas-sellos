import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroHorasService } from '../../services/registro-horas.service';
import { RegistroHora } from '../../models/registro-horas.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-registro-horas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-registro-horas-component.component.html',
  styleUrls: ['./listar-registro-horas-component.component.css']
})
export class ListarRegistroHorasComponent implements OnInit {
  registros: RegistroHora[] = [];
  error?: string;

  constructor(private regSrv: RegistroHorasService) {}

  ngOnInit() {
    this.cargarRegistros();
  }

  private cargarRegistros(): void {
    this.regSrv.listar().subscribe({
      next: data => this.registros = data,
      error: () => this.error = 'Error al cargar registros'
    });
  }

eliminarRegistro(id: number) {
  if (!confirm('¿Seguro que deseas eliminar este registro?')) return;

  this.regSrv.eliminar(id).subscribe({
    next: () => this.cargarRegistros(),
    error: err => {
      console.error('Error al eliminar registro:', err);
      alert('No se pudo eliminar el registro');
    }
  });
  }
}