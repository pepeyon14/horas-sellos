import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 export interface RegistroHoras {
  ID_HoraSello: number;
  ID_Evento: number;
  RutAlumno: string;
  RutAdministrativos: string;
  FechaInicio: Date;
  FechaTermino: Date;
  CantidadHoras: number;
  NombreEvento: string;
  NombreAdm: string;
  ApellidoAdm: string;
  HorasRegistradas: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorasSellosService {

  private apiUrl = 'http://localhost:3000/api/horassello';
  
  constructor(private http: HttpClient) {}

  obtenerHorasPorRut(rut: string): Observable<RegistroHoras[]> {
    return this.http.get<RegistroHoras[]>(`${this.apiUrl}/alumno/${rut}`);
  }
}
