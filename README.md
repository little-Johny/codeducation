# codeducation
This is a training project for Senasoft, open source development.  It consists of a Netflix-inspired educational streaming platform.


--Estructura de carpetas--



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
