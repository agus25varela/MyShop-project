import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Esto arregla el error de ngModel
import { ProductoService } from './services/producto';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent], // Asegúrate de que FormsModule esté aquí
  templateUrl: './app.component.html',
  // Aquí NO debe estar la línea de styleUrl
})
export class AppComponent implements OnInit {
  listaProductos: any[] = [];

  // Esto arregla el error de "Property nuevoProducto does not exist"
  nuevoProducto = {
    nombre: '',
    precio: 0,
    stock: 0,
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.listar().subscribe((data) => {
      this.listaProductos = data;
    });
  }

  // Esto arregla el error de "Property guardar does not exist"
  guardar() {
    this.productoService.crear(this.nuevoProducto).subscribe(() => {
      this.obtenerProductos(); // Refresca la tabla
      this.nuevoProducto = { nombre: '', precio: 0, stock: 0 }; // Limpia el form
    });
  }
}
