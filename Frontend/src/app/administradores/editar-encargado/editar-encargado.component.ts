import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EncargadoService } from '../../services/encargado.service';
import { Encargado } from '../../models/encargado.models';

@Component({
  selector: 'app-editar-encargado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-encargado.component.html',
  styleUrls: ['./editar-encargado.component.css']   // reaprovecha tu css
})
export class EditarEncargadoComponent implements OnInit {

  encargado!: Encargado;      // se carga desde backend
  rut!: string;               // clave para PUT
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadoSrv: EncargadoService
  ) {}

  ngOnInit(): void {
    // rut sacado de la URL
    this.rut = this.route.snapshot.paramMap.get('rut')!;
    this.encargadoSrv.obtenerPorRut(this.rut).subscribe({
      next: (data) => this.encargado = data,
      error: ()     => this.error = 'No se pudo cargar el encargado'
    });
  }

  guardar(): void {
    this.encargadoSrv.editar(this.rut, this.encargado).subscribe({
      next: ()  => this.router.navigate(['/encargados']),
      error: () => alert('Error al guardar cambios')
    });
  }

  cancelar(): void {
    this.router.navigate(['/encargados']);
  }
}
