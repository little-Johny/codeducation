# codeducation
Este es un proyecto de capacitación para Senasoft, desarrollado en código abierto. Consiste en una plataforma de streaming educativo inspirada en Netflix.


--Estructura de carpetas--


```bash
coadeducation/
│
├── backend/               # Backend (Express + Sequelize)
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js # configuracion de variables de entorno para usarlas
│   │   │   └── database.js # conexion a base de datos con sequelize
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
│   ├── docker-compose.yml # orquestacion de contenedores inicialmente de postgres y pgadmin
│   ├── api.Dockerfile
│   └── web.Dockerfile
│
├── README.md
 
└── package.json       # gestion de workspaces
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

