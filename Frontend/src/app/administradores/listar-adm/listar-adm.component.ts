import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativoService  } from '../../services/administrativo.service';
import { Administrativo} from '../../models/administrativos.models';

@Component({
  selector: 'app-listar-adm',
  templateUrl: './listar-adm.component.html',
  styleUrls: ['./listar-adm.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListarAdmComponent implements OnInit {
  administrativos: Administrativo[] = [];
  error = '';

  constructor(private admSrv: AdministrativoService) {}

  ngOnInit(): void {
    this.admSrv.listar().subscribe({
      next: data => this.administrativos = data,
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de administradores';
      }
    });
  }
}
