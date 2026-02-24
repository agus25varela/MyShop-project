import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import emailjs from '@emailjs/browser';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    const email = this.forgotForm.value.email ?? '';
    this.isLoading = true;

    this.authService.checkEmailExists(email)
    .pipe(
      finalize(() => {
        // Esto se ejecuta SIEMPRE: cuando termina bien o cuando da error
        this.isLoading = false; 
      })
    ).subscribe({
      next: (exists) => {
        if (exists === false || !exists) {
          this.isLoading = false;
          this.errorMessage = 'El correo no está registrado.';
          this.successMessage = '';
          this.cdr.detectChanges();
          return;
        }

        this.procederConEnvioEmail(email);
      },
      error: (err) => {
        console.error('Error al validar email:', err);
        this.isLoading = false; 
        this.errorMessage = 'No se pudo conectar con el servidor para validar el correo.';
        this.cdr.detectChanges();
      }
    });
}

private procederConEnvioEmail(email: string): void {
  const encodedEmail = encodeURIComponent(email.trim());
  const resetLink = `${environment.baseUrl}/auth/login?recovery=true&email=${encodedEmail}`; //Cuando el usuario haga clic, Angular sabrá exactamente a qué cuenta aplicarle la nueva contraseña.

  emailjs.send(
    'service_up2mads',
    'template_wm03r0p',
    { to_email: email, reset_link: resetLink },
    'Nsta1wQrvhCYsmFzi'
  )
  .then(() => {
    this.successMessage = '¡Enlace enviado! Revisa tu bandeja de entrada.';
    this.forgotForm.reset();
  })
  .catch((error) => {
    console.error('Error de EmailJS:', error);
    this.errorMessage = 'Error al enviar el correo. Revisa tu conexión.';
  })
  .finally(() => {
    // Apagamos el spinner al final del proceso de EmailJS
    this.isLoading = false;
  });
}
}
