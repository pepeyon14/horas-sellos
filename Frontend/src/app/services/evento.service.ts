import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from  '../models/evento.models';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private apiUrl = 'http://localhost:3000/api/eventos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  cambiarEstado(evento: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${evento.id}/estado`, {
      estado: !evento.Estado
    });
  }

  // Métodos adicionales según necesidad
  obtenerPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  crear(evento: Evento): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  editar(id: number, evento: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}