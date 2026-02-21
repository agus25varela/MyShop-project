import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public authService = inject(AuthService); // Lo hacemos público para usarlo en el HTML
  private router = inject(Router);
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
    this.router.navigate(['/auth/login']);
  }
}