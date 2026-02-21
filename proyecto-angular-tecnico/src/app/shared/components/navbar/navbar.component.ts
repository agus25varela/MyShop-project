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
  isUserMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
    this.closeUserMenu();
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
    this.closeUserMenu();
    this.router.navigate(['/auth/login']);
  }
}