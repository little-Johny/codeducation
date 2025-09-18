# codeducation

Este es un proyecto de capacitación para Senasoft, desarrollado en código abierto. Consiste en una plataforma de streaming educativo inspirada en Netflix.

## Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Docker y Docker Compose (opcional, para ejecutar la base de datos)


## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/little-Johny/codeducation.git
   cd codeducation
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración del Entorno

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

2. Configura las variables en `.env`:
   - Configura la conexión a la base de datos (PostgreSQL)
   - Configura las claves JWT
   - Otras variables necesarias

## Ejecutar con Docker

Para ejecutar la base de datos y pgAdmin usando Docker:

```bash
npm run docker:up
```

Esto iniciará:
- PostgreSQL en el puerto 5432 (usuario: toby, contraseña: toby3312, base de datos: codeducation)
- pgAdmin en el puerto 5050 (usuario: admin@mail.com, contraseña: 3312)

## Ejecutar Localmente

### Backend

```bash
npm run dev:backend
```

El servidor backend se ejecutará en el puerto configurado (por defecto 3000).

### Frontend

```bash
npm run dev:frontend
```

La aplicación frontend se ejecutará en http://localhost:5173 (puerto de Vite).

## Configuración de la Base de Datos

### Migraciones

Para ejecutar las migraciones de la base de datos:

```bash
cd backend
npm run migrations:run
```

Para revertir la última migración:

```bash
npm run migrations:revert
```

Para revertir todas las migraciones:

```bash
npm run migrations:delete
```

### Seeds

Para ejecutar todos los seeders:

```bash
cd backend
npm run seed:all
```

Para revertir los seeders:

```bash
npm run seed:undo
```

Scripts específicos para usuarios:

```bash
npm run seed:users          # Ejecutar seed de usuarios
npm run seed:users:clear    # Limpiar y ejecutar seed de usuarios
npm run seed:generate-users # Generar usuarios de prueba
```

## Estructura de carpetas

```bash
codeducation/
│
├── backend/               # Backend (Express + Sequelize)
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js # configuración de variables de entorno para usarlas
│   │   │   └── database.js # conexión a base de datos con sequelize
│   │   ├── controllers/
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   ├── models/
│   │   │   ├── seeders/
│   │   │   └── config.js
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/               # Frontend (React + Vite + Tailwind)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── .env
│   └── package.json
│
├── docker/            # Infraestructura (dockerfiles, compose, etc.)
│   ├── docker-compose.yml # orquestación de contenedores inicialmente de postgres y pgadmin
│   ├── api.Dockerfile
│   └── web.Dockerfile
│
├── docs/
│   ├── codeducaiton_structure.sql
│   └── Insomnia_2025-09-10codeducation.yaml
│
├── README.md
│
└── package.json       # gestión de workspaces
```

## Arquitectura y Patrones de Diseño

Este proyecto sigue una **arquitectura en capas (Layered Architecture / N-tier)**, separando claramente responsabilidades entre:

1. **Controller**:
   Recibe las solicitudes HTTP, delega la lógica al service y devuelve las respuestas. Actúa como fachada para simplificar la interacción con la capa de negocio.

2. **Service**:
   Contiene la **lógica de negocio**, orquesta la interacción con los repositorios y transforma datos si es necesario (ej. hashing de contraseñas). Aplica el **Service Layer Pattern**.

3. **Repository**:
   Abstrae el acceso a la base de datos y aplica el **Repository Pattern**. La clase `BaseRepository` implementa métodos CRUD genéricos, y cada repositorio hijo puede añadir métodos específicos (`UserRepository.findByEmail`).

4. **Model (Sequelize)**:
   Define la estructura de los datos y las asociaciones entre entidades. Usa un enfoque **Active Record / Data Mapper**.

5. **Inyección de dependencias**:
   Los controllers y services reciben sus dependencias por constructor, facilitando el desacoplamiento y pruebas unitarias.

6. **Manejo de errores**:
   Se utiliza el patrón de **Middleware de Express** para centralizar el manejo de errores y mantener los controllers limpios.

### Buenas prácticas aplicadas:
- Separación clara de responsabilidades entre capas.
- Código DRY en repositorios gracias a `BaseRepository`.
- Hash de contraseñas antes de persistir usuarios.
- Uso de asociaciones de Sequelize para relaciones entre modelos.
- Facilidad para pruebas unitarias gracias a inyección de dependencias.

## Documentación de la API

La documentación de la API está disponible en el archivo `docs/Insomnia_2025-09-10codeducation.yaml` para importar en Insomnia o herramientas similares como Postman.

