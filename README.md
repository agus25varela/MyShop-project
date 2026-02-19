# 🛒 MyShop - Sistema de Gestión de Productos

Prueba técnica desarrollada como graduado de **Teclab**. Este sistema permite la gestión integral de productos, conectando un frontend moderno con una arquitectura de backend robusta y persistencia en base de datos.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** [Angular 17+](https://angular.io/) & [Bootstrap 5](https://getbootstrap.com/)
* **Backend:** [Java 17](https://www.oracle.com/java/) & [Spring Boot 3](https://spring.io/projects/spring-boot) (Spring Data JPA)
* **Base de Datos:** [MySQL](https://www.mysql.com/)
* **Control de Versiones:** Git & GitHub

## 📋 Requisitos Previos

* Node.js y Angular CLI instalado.
* Java JDK 17 o superior.
* MySQL Server corriendo localmente.

## 🚀 Instrucciones de Instalación y Uso

### 1. Base de Datos
Importa el archivo `script-db.sql.txt` en tu cliente de MySQL (Workbench) para crear la base de datos y la tabla de productos.

### 2. Backend (Spring Boot)
1. Ve a la carpeta `Spring Boot Prueba Tecnica`.
2. Configura tu usuario y contraseña de MySQL en `src/main/resources/application.properties`.
3. Ejecuta el comando: `./mvnw spring-boot:run`. El servidor iniciará en `http://localhost:8080`.

### 3. Frontend (Angular)
1. Ve a la carpeta `proyecto-angular-tecnico`.
2. Instala las dependencias: `npm install`.
3. Inicia la aplicación: `npx ng serve`.
4. Abre tu navegador en `http://localhost:4200`.

## ✨ Funcionalidades
- [x] Listado de productos en tiempo real desde MySQL.
- [x] Formulario para persistencia de nuevos productos (Nombre, Precio, Stock).
- [x] Conexión mediante API REST con manejo de CORS.
