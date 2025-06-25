// administrativo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Administrativo {
  rut: string;
  Nombre: string;
  Apellido: string;
  Cargo: string;
  Correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {
  private apiUrl = 'http://localhost:3000/api/administrativos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Administrativo[]> {
    return this.http.get<Administrativo[]>(`${this.apiUrl}/listar`);
  }
}
