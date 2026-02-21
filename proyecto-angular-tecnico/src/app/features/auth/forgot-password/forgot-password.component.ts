import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import emailjs from '@emailjs/browser';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
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

    this.authService.checkEmailExists(email).subscribe({
      next: (exists) => {
        if (!exists) {
          this.isLoading = false;
          this.errorMessage = 'El correo no está registrado en la base de datos.';
          return;
        }

        const resetLink = `${window.location.origin}/auth/login?recovery=true`;

        emailjs
          .send(
            'YOUR_EMAILJS_SERVICE_ID',
            'YOUR_EMAILJS_TEMPLATE_ID',
            {
              to_email: email,
              reset_link: resetLink
            },
            'YOUR_EMAILJS_PUBLIC_KEY'
          )
          .then(() => {
            this.successMessage = 'Enlace de recuperación enviado al correo.';
            this.forgotForm.reset();
          })
          .catch(() => {
            this.errorMessage = 'No se pudo enviar el correo. Revisa la configuración de EmailJS.';
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'No fue posible validar el correo en el servidor.';
      }
    });
  }
}
