import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EncargadoService } from '../../services/encargado.service';
import { Encargado } from '../../models/encargado.models';

@Component({
  selector: 'app-listar-encargado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-encargado.component.html',
  styleUrls: ['./listar-encargado.component.css']
})
export class ListarEncargadoComponent implements OnInit {

  encargados: Encargado[] = [];
  error = '';

  constructor(private encargadoSrv: EncargadoService, private router: Router) {}

  irACrear() {
    this.router.navigate(['/admin/encargados/crear']);
  }

  irAEditar(rut: string) {
    this.router.navigate(['/admin/encargados/editar', rut]);
  }

  irAEliminar(rut: string) {
    this.encargadoSrv.eliminar(rut).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error('Error al eliminar:', err)
    });
  }

  ngOnInit(): void {
    this.encargadoSrv.listar().subscribe({
      next: data => this.encargados = data,
      error: () => this.error = 'No se pudieron cargar los encargados'
    });
  }
}
