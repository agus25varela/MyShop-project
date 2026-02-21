import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../../shared/components/product-card/product.model';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    private authService = inject(AuthService);
    private productService = inject(ProductService);
    private router = inject(Router);
  
    productosReales: any[] = [];
    isLoading: boolean = true;

  // Control de acceso simple para mostrar panel de administración
  isLoggedIn = false;

  nuevoProducto: { nombre: string; precio: number; stock: number } = {
    nombre: '',
    precio: 0,
    stock: 0,
  };

  productosPrueba: Product[] = [
    {
      id: 1,
      name: 'Notebook Pro 15',
      description: 'Potente laptop para desarrollo',
      price: 1500,
      stock: 10,
      imageUrl: 'https://via.placeholder.com/300',
      category: 'Laptops'
    },
    {
      id: 2,
      name: 'Mouse Gamer RGB',
      description: 'Mouse ergonómico',
      price: 45,
      stock: 3, 
      imageUrl: 'https://via.placeholder.com/300',
      category: 'Accesorios'
    }
  ];

  constructor(
  private cdr: ChangeDetectorRef 
) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.isLoading = true;
    this.productService.listar().subscribe({
      next: (data: any[]) => {
        this.productosReales = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Error al conectar con el servidor de productos:', err);
        this.isLoading = false;
      }
    });
  }

  // LÓGICA DEL CARRITO
  addToCart(product: any): void {
    if (!this.isLoggedIn) {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      this.router.navigate(['/auth/login']); // Redirigimos al login
    } else {
      // Aquí iría la lógica real (ej: llamar a un CartService)
      console.log('Añadiendo al carrito:', product);
      alert(`¡${product.nombre} añadido al carrito con éxito!`);
    }
  }

  handleAddToCart(product: any): void {
    this.addToCart(product);
  }

  guardar() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.precio > 0) {
      this.productService.crear(this.nuevoProducto).subscribe({
        next: () => {
          this.obtenerProductos(); // Recargamos la lista
          this.nuevoProducto = { nombre: '', precio: 0, stock: 0 };
          alert('Producto guardado correctamente');
        },
        error: (_err: unknown) => alert('Error al guardar en base de datos')
      });
  }
}
}
