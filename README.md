# codeducation
Este es un proyecto de capacitación para Senasoft, desarrollado en código abierto. Consiste en una plataforma de streaming educativo inspirada en Netflix.


--Estructura de carpetas--


```bash
edustream-pro/
│
├── backend/               # Backend (Express + Sequelize)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── migrations/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── seeders/
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
│   ├── docker-compose.yml
│   ├── api.Dockerfile
│   └── web.Dockerfile
│
├── README.md
 
└── package.json       # opcional si quieres usar workspaces
```