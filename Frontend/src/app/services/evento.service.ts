import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from  '../models/evento.models';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private apiUrl = 'http://localhost:3000/api/eventos';

  constructor(private http: HttpClient) {}

  getEventos() {
    return this.http.get<Evento[]>('/api/eventos');
  }

  getEventoPorId(id: number) {
    return this.http.get<Evento>(`/api/eventos/${id}`);
  }

  editarEvento(id: number, evento: Evento) {
    return this.http.put(`/api/eventos/editar/${id}`, evento);
  }

  crearEvento(evento: Evento) {
    return this.http.post('/api/eventos/crear', evento);
  }

  eliminarEvento(id: number) {
    return this.http.delete(`/api/eventos/eliminar/${id}`);
  }

}