import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alumno {
  RutAlumno: string;
  Nombre: string;
  Apellido: string;
  Facultad: string;
  Carrera: string;
  Generacion: number;
}

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {

  private apiUrl = 'http://localhost:3000/api/alumnos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  crear(alumno: any) {
    return this.http.post('http://localhost:3000/api/alumnos/crear', alumno);
  }

  obtenerPorRut(rut: string): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${rut}`);
  }

  editar(rut: string, alumno: any) {
    return this.http.put(`${this.apiUrl}/editar/${rut}`, alumno);
  }

  eliminar(rut: string) {
    return this.http.delete(`${this.apiUrl}/eliminar/${rut}`);
  }

  obtenerAlumnoPorRut(rut: string): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${rut}`);
  }
}
