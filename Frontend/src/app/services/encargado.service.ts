import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargado } from '../models/encargado.models';

@Injectable({ providedIn: 'root' })
export class EncargadoService {
  private apiUrl = 'http://localhost:3000/api/encargados';

  constructor(private http: HttpClient) {}

  listar(): Observable<Encargado[]> {
    return this.http.get<Encargado[]>(`${this.apiUrl}/listar`);
  }

  crear(encargado: Encargado): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, encargado);
  }

  editar(rut: string, encargado: Encargado): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${rut}`, encargado);
  }

  eliminar(rut: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${rut}`);
  }

  obtenerPorRut(rut: string): Observable<Encargado> {
    return this.http.get<Encargado>(`${this.apiUrl}/${rut}`);
  }
}
