import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.loggedIn.asObservable();

  constructor() {
    // En una app real, aquí se verificaría si hay un token guardado en localStorage
    // Si hay un token válido, se establecería loggedIn.next(true);
  }

  login(username: string, password: string): void {
    // En una aplicación real, aquí llamarías a tu API de backend
    // y si las credenciales son correctas, harías:
    if (username === 'admin' && password === '123') { // Credenciales de prueba
      this.loggedIn.next(true); // Establece el estado a logueado
      console.log('AuthService: Login exitoso (simulado).'); // Mensaje para la consola
    } else {
      this.loggedIn.next(false); // Mantén el estado a no logueado
      console.log('AuthService: Credenciales incorrectas (simulado).'); // Mensaje para la consola
    }
  }

  logout(): void {
    this.loggedIn.next(false);
    // En una app real, aquí borrarías el token de localStorage
    console.log('AuthService: Sesión cerrada.');
  }

  getAuthStatus(): boolean {
    return this.loggedIn.getValue();
  }
}