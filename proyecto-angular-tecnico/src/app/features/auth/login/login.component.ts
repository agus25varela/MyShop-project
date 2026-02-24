import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isRecoveryMode = false;
  userEmail = '';
  newPassword = '';
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit() {
  // Detectamos si el link del mail activó el modo recuperación
  this.route.queryParams.subscribe(params => {
    this.isRecoveryMode = params['recovery'] === 'true';
    this.userEmail = params['email'] || '';
    if (this.isRecoveryMode) {
      console.log('Modo recuperación activado para:', this.userEmail);
    }
  });
}

  onSubmit() {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response.token);
        // 1. Guardamos el token
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.rol); 
        localStorage.setItem('username', response.username);
        // 2. Redirigimos al catálogo de productos
        this.router.navigate(['/products']); 
        
        alert('¡Bienvenido, ' + response.username + '!');
      },
      error: (err) => {
        console.error('Error de login:', err);
        alert('Credenciales incorrectas. Intenta de nuevo.');
      }
    });
  }
}

onResetPassword() {
        if (!this.newPassword || this.newPassword.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

    if (!this.userEmail) {
      alert('No se encontró el correo asociado. Vuelve a solicitar el enlace de recuperación.');
      return;
    }

        // Llamamos al servicio para impactar en la base de datos
        this.authService.updatePassword(this.userEmail, this.newPassword).subscribe({
            next: (res: any) => {
                alert('¡Contraseña actualizada con éxito! Ahora puedes iniciar sesión.');
                // Limpiamos y volvemos al login normal
                this.isRecoveryMode = false;
                this.newPassword = '';
                this.router.navigate(['/auth/login']); 
            },
            error: (err: any) => {
                console.error('Error al resetear:', err);
                alert('No se pudo actualizar la contraseña. Revisa el servidor.');
            }
        });
    }

}