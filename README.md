# 🛒 MyShop - Sistema E-commerce Fullstack

Este proyecto es una plataforma integral de gestión de productos y compras que conecta un frontend reactivo con una arquitectura de backend robusta y segura

## 🛠️ Tecnologías Utilizadas

* **Backend:** [Java 17](https://www.oracle.com/java/) & [Spring Boot 3+](https://spring.io/projects/spring-boot)
* **Seguridad:** [Spring Security](https://spring.io/projects/spring-security) con **JWT** (JSON Web Tokens)
* **Frontend:** [Angular 17+](https://angular.io/) con arquitectura de **Standalone Components**
* **Base de Datos:** [MySQL 8+](https://www.mysql.com/) con **JPA/Hibernate**
* **Diseño:** Responsive UI con **Flexbox/Grid** (Mobile First)

---

## ✨ Funcionalidades Implementadas

### 🔐 Seguridad y Acceso
* **Autenticación JWT:** Registro de usuarios y Login seguro con encriptación **BCrypt**
* **Protección de Rutas:** Guards en Angular y filtros `OncePerRequestFilter` en el Backend
* **Roles de Usuario:** Diferenciación entre `ROLE_USER` y `ROLE_ADMIN`

### 🛍️ Gestión de Productos
* **Catálogo Dinámico:** Listado con **paginación** y filtros por categoría
* **Rutas Dinámicas:** Detalle de producto mediante parámetros de ruta (`/products/:id`)

### ❤️ Favoritos y Carrito
* **Favoritos:** Relación *Many-to-Many* persistente entre usuarios y productos
* **Carrito de Compras:** Gestión de ítems con persistencia y cálculo automático de subtotales/envío
* **Checkout:** Proceso de compra transaccional (`@Transactional`) con validación de stock

---

## 📂 Estructura del Proyecto

### Backend (Spring Boot) 
```text
com.tuapp
├── config/       # Configuración de CORS y Security 
├── controller/   # Endpoints REST 
├── service/      # Lógica de negocio 
├── repository/   # Acceso a datos (JPA) 
├── dto/          # Data Transfer Objects 
├── entity/       # Modelos de base de datos 
└── exception/    # Manejo global de errores (@ControllerAdvice)

## Frontend (Angular)
/src/app
├── core/         # Servicios, Guards e Interceptors 
├── shared/       # Componentes reutilizables (Navbar, Cards, Inputs) 
└── features/     # Módulos: auth, products, cart, favorites 

🚀 Instalación y Uso1. Base de DatosConfigura tu esquema en MySQL e importa las tablas requeridas (users, products, carts, etc.). Asegúrate de actualizar el application.properties con tus credenciales.2. BackendNavega a la carpeta del backend.Ejecuta: ./mvnw spring-boot:run.El servidor iniciará en http://localhost:8080.3. FrontendNavega a la carpeta proyecto-angular-tecnico.Instala dependencias: npm install.Inicia la app: ng serve.Abre http://localhost:4200.
