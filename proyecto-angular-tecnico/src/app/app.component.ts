import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Product } from './shared/components/product-card/product.model';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductoService } from './services/producto';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, ProductCardComponent], 
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  listaProductos: any[] = [];

  nuevoProducto = {
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

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.listar().subscribe((data) => {
      this.listaProductos = data;
    });
  }

  guardar() {
    this.productoService.crear(this.nuevoProducto).subscribe(() => {
      this.obtenerProductos();
      this.nuevoProducto = { nombre: '', precio: 0, stock: 0 };
    });
  }
}
