import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface FormCarga {
  ID_Evento:         number;
  RutAdministrativos:string;
  FechaInicio:       string;
  FechaTermino:      string;
  CantidadHoras:     number;
}

@Component({
  selector: 'app-carga-masiva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})

export class CargaMasivaComponent {
  file!: File;
  loading = false;
  mensaje = '';

  form: FormCarga = {
    ID_Evento: 0,
    RutAdministrativos: '',
    FechaInicio: '',
    FechaTermino: '',
    CantidadHoras: 0
  };

  constructor(private http: HttpClient) {}

  /** Guarda el archivo seleccionado */
  onFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (input.files?.length) this.file = input.files[0];
  }

  /** Envía el formulario + archivo al backend */
  subirExcel() {
    if (!this.file) {
      alert('Seleccione un archivo Excel');
      return;
    }

    this.loading = true;
    this.mensaje = '';

    const fd = new FormData();
    fd.append('file', this.file);
    Object.entries(this.form).forEach(([k, v]) => fd.append(k, String(v)));

    this.http.post<{ ok: boolean; insertados: number }>(
      '/api/registros/cargar-excel', fd
    ).subscribe({
      next: r => {
        this.mensaje = `✔️ Cargados ${r.insertados} registros correctamente.`;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.mensaje = '❌ Error al cargar: ' + (err.error?.error || 'desconocido');
        this.loading = false;
      }
    });
  }
}