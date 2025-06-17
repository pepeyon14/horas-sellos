import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alumno {
  RutAlumno: string;
  Nombre: string;
  Apellido: string;
  Facultad: string;
  Carrera: string;
  Correo: string;
  Generacion: number;
}

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {

  private apiUrl = 'http://localhost:3000/api/alumno';

  constructor(private http: HttpClient) {}

  obtenerAlumnoPorRut(rut: string): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${rut}`);
  }
}
