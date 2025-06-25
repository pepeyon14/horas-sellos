import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Evento } from '../models/evento.models';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private apiUrl = '/api/eventos';   // ← gracias al proxy

  constructor(private http: HttpClient) {}

  /* LISTAR -------------------------------------------------- */
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  /* OBTENER POR ID ----------------------------------------- */
  getEventoPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`).pipe(
      map(e => ({
        ...e,
        // <input type="date"> requiere yyyy-MM-dd
        Fecha: e.Fecha?.slice(0, 10)
      }))
    );
  }

  /* CREAR --------------------------------------------------- */
  crearEvento(evento: Evento) {
    return this.http.post(`${this.apiUrl}/crear`, evento);
  }

  /* EDITAR -------------------------------------------------- */
  editarEvento(id: number, evento: Evento) {
    const body: Evento = {
      ...evento,
      Fecha: evento.Fecha?.includes('T')
        ? evento.Fecha.replace('T', ' ') + ':00'
        : evento.Fecha
    };
    return this.http.put(`${this.apiUrl}/editar/${id}`, body);
  }
  /* ELIMINAR ------------------------------------------------ */
  eliminarEvento(id: number) {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /* Alias opcional ----------------------------------------- */
  obtenerPorId(id: number) {
    return this.getEventoPorId(id);
  }
}
