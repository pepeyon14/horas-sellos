import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface RegistroHora {
  ID_HoraSello: number;
  ID_Evento: number;
  RutAlumno: string;
  RutAdministrativos: string;
  FechaInicio: string;
  FechaTermino: string;
  CantidadHoras: number;
}

@Injectable({ providedIn: 'root' })
export class RegistroHorasService {
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<RegistroHora[]>('/api/registros/listar');
  }

  eliminar(id: number) {
    return this.http.delete(`/api/registros/eliminar/${id}`);
  }

  crear(registro: Omit<RegistroHora, 'ID_HoraSello'>): Observable<RegistroHora> {
    return this.http.post<RegistroHora>('/api/registros/crear', registro);
  }

  obtenerPorId(id: number): Observable<RegistroHora> {
    return this.http
      .get<RegistroHora>(`/api/registros/obtener/${id}`)
      .pipe(
        map((r) => ({
          ...r,
          FechaInicio:  r.FechaInicio.slice(0, 16),
          FechaTermino: r.FechaTermino.slice(0, 16)
        }))
      );
  }

  editar(id: number, datos: RegistroHora) {
    return this.http.put(`/api/registros/editar/${id}`, datos);
  }
}