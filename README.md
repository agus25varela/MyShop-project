# 🛒 MyShop - Sistema E-commerce Fullstack

[cite_start]Este proyecto es una plataforma integral de gestión de productos y compras que conecta un frontend reactivo con una arquitectura de backend robusta y segura

## 🛠️ Tecnologías Utilizadas

* [cite_start]**Backend:** [Java 17](https://www.oracle.com/java/) & [Spring Boot 3+](https://spring.io/projects/spring-boot)
* [cite_start]**Seguridad:** [Spring Security](https://spring.io/projects/spring-security) con **JWT** (JSON Web Tokens)
* [cite_start]**Frontend:** [Angular 17+](https://angular.io/) con arquitectura de **Standalone Components**
* [cite_start]**Base de Datos:** [MySQL 8+](https://www.mysql.com/) con **JPA/Hibernate**
* [cite_start]**Diseño:** Responsive UI con **Flexbox/Grid** (Mobile First)

---

## ✨ Funcionalidades Implementadas

### 🔐 Seguridad y Acceso
* [cite_start]**Autenticación JWT:** Registro de usuarios y Login seguro con encriptación **BCrypt**
* [cite_start]**Protección de Rutas:** Guards en Angular y filtros `OncePerRequestFilter` en el Backend
* [cite_start]**Roles de Usuario:** Diferenciación entre `ROLE_USER` y `ROLE_ADMIN`

### 🛍️ Gestión de Productos
* [cite_start]**Catálogo Dinámico:** Listado con **paginación** y filtros por categoría
* [cite_start]**Rutas Dinámicas:** Detalle de producto mediante parámetros de ruta (`/products/:id`)

### ❤️ Favoritos y Carrito
* [cite_start]**Favoritos:** Relación *Many-to-Many* persistente entre usuarios y productos
* [cite_start]**Carrito de Compras:** Gestión de ítems con persistencia y cálculo automático de subtotales/envío
* [cite_start]**Checkout:** Proceso de compra transaccional (`@Transactional`) con validación de stock

---

## 📂 Estructura del Proyecto

### [cite_start]Backend (Spring Boot) 
```text
com.tuapp
[cite_start]├── config/       # Configuración de CORS y Security 
[cite_start]├── controller/   # Endpoints REST 
[cite_start]├── service/      # Lógica de negocio 
[cite_start]├── repository/   # Acceso a datos (JPA) 
[cite_start]├── dto/          # Data Transfer Objects 
[cite_start]├── entity/       # Modelos de base de datos 
[cite_start]└── exception/    # Manejo global de errores (@ControllerAdvice)

## Frontend (Angular)
/src/app
├── core/         # Servicios, Guards e Interceptors 
├── shared/       # Componentes reutilizables (Navbar, Cards, Inputs) 
└── features/     # Módulos: auth, products, cart, favorites 

🚀 Instalación y Uso1. Base de DatosConfigura tu esquema en MySQL e importa las tablas requeridas (users, products, carts, etc.). Asegúrate de actualizar el application.properties con tus credenciales.2. BackendNavega a la carpeta del backend.Ejecuta: ./mvnw spring-boot:run.El servidor iniciará en http://localhost:8080.3. FrontendNavega a la carpeta proyecto-angular-tecnico.Instala dependencias: npm install.Inicia la app: ng serve.Abre http://localhost:4200.
