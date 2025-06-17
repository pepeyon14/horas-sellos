import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { Router } from '@angular/router';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Si usas <mat-icon>


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
  // Aquí irá la lógica de tu componente (vacía por ahora)

    constructor(private router: Router) {}
    
    volverInicio() {
    this.router.navigate(['/']);
  }
}