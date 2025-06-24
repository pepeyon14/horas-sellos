import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistroHoras {
  RutAlumno: string;
  NombreAlumno: string;
  ApellidoAlumno: string;
  FechaInicio: string;
  FechaTermino: string;
  HorasRegistradas: number;
  NombreEvento: string;
  HorasEvento: number;
  NombreAdm: string;
  ApellidoAdm: string;
}

@Injectable({
  providedIn: 'root'
})
export class HorasSellosService {
  private apiUrl = 'http://localhost:3000/api/consultar-horas';

  constructor(private http: HttpClient) {}

  /** Devuelve todas las horas de un alumno */
  obtenerHorasPorRut(rut: string): Observable<RegistroHoras[]> {
    return this.http.get<RegistroHoras[]>(`${this.apiUrl}/alumno/${rut}`);
  }
}