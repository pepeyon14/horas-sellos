import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { Router } from '@angular/router'; // Para la navegación programática

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Si usas <mat-icon>

// Importa tu AuthService para manejar la lógica de autenticación
import { AuthService } from '../auth.service'; // <-- ¡IMPORTA TU AUTHSERVICE AQUÍ!

@Component({
  selector: 'app-login-adm', // Selector estándar en kebab-case
  standalone: true,
  imports: [ // ¡Aquí están todas las importaciones!
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule // Inclúyelo si estás usando los iconos en tu HTML
  ],
  templateUrl: './login-adm.component.html',
  styleUrl: './login-adm.component.css'
})
export class LoginAdmComponent {
  // --- Propiedades para vincular con los campos del formulario ---
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Para mostrar mensajes de error al usuario

  // --- Inyecta el AuthService y el Router en el constructor ---
  constructor(private authService: AuthService, private router: Router) {} // <-- ¡AuthService inyectado!

  // --- Método que se llama cuando el formulario de login se envía ---
  onSubmit(): void {
    // 1. Llama al método login de tu AuthService con las credenciales ingresadas
    this.authService.login(this.username, this.password);
    console.log('LoginAdmComponent: Intentando login con', this.username, 'y contraseña oculta.'); // Mensaje para depurar

    // 2. Después de intentar el login, verifica el estado de autenticación
    if (this.authService.getAuthStatus()) {
      this.errorMessage = ''; // Si el login fue exitoso, limpia cualquier error
      this.router.navigate(['/dashboard']); // Redirige al dashboard
      console.log('LoginAdmComponent: Login exitoso, redirigiendo a /dashboard.'); // Mensaje para depurar
    } else {
      // Si el login falló, muestra un mensaje de error
      this.errorMessage = 'Credenciales incorrectas. Inténtelo de nuevo.';
      console.log('LoginAdmComponent: Login fallido, mostrando mensaje de error.'); // Mensaje para depurar
    }
  }

  // --- Método para regresar a la página de inicio ---
  volverInicio(): void {
    this.router.navigate(['/inicio']); // Mejor usar '/inicio' explícitamente en lugar de '/'
  }
}