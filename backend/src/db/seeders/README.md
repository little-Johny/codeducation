# 🌱 Seeders de Base de Datos

Este directorio contiene los seeders para poblar la base de datos con datos de prueba.

## 📁 Archivos Disponibles

### `20250101000000-user-seeder.js`
Seeder oficial de Sequelize que crea usuarios predefinidos con roles específicos.

## 🚀 Scripts Disponibles

### Scripts de NPM (desde la carpeta `backend/`)

```bash
# Ejecutar seeder de usuarios predefinidos
npm run seed:users

# Ejecutar seeder de usuarios limpiando datos existentes
npm run seed:users:clear

# Generar usuarios aleatorios (por defecto 20)
npm run seed:generate-users

# Generar usuarios aleatorios limpiando datos existentes
npm run seed:generate-users:clear

# Generar usuarios aleatorios con cantidad específica
npm run seed:generate-users 50

# Ejecutar todos los seeders de Sequelize
npm run seed:run

# Revertir todos los seeders de Sequelize
npm run seed:undo
```

### Scripts Directos

```bash
# Ejecutar seeder de usuarios predefinidos
node src/utils/scripts/seedUsers.js

# Ejecutar seeder con limpieza
node src/utils/scripts/seedUsers.js --clear

# Generar usuarios aleatorios
node src/utils/scripts/generateTestUsers.js

# Generar usuarios aleatorios con cantidad específica
node src/utils/scripts/generateTestUsers.js 30

# Generar usuarios aleatorios con limpieza
node src/utils/scripts/generateTestUsers.js 30 --clear
```

## 👥 Usuarios Predefinidos

El seeder crea los siguientes usuarios con contraseña `123456`:

| Nombre | Email | Rol | Tema |
|--------|-------|-----|------|
| Admin Principal | admin@codeducation.com | admin | claro |
| Profesor Juan Pérez | juan.perez@codeducation.com | teacher | claro |
| Profesora María García | maria.garcia@codeducation.com | teacher | oscuro |
| Estudiante Carlos López | carlos.lopez@codeducation.com | student | claro |
| Estudiante Ana Martínez | ana.martinez@codeducation.com | student | oscuro |
| Estudiante Pedro Rodríguez | pedro.rodriguez@codeducation.com | student | claro |
| Profesor Roberto Silva | roberto.silva@codeducation.com | teacher | claro |
| Estudiante Laura Fernández | laura.fernandez@codeducation.com | student | oscuro |
| Estudiante Miguel Torres | miguel.torres@codeducation.com | student | claro |
| Profesora Carmen Ruiz | carmen.ruiz@codeducation.com | teacher | oscuro |

## 🎲 Usuarios Aleatorios

El generador de usuarios aleatorios crea usuarios con:
- Nombres y apellidos en español
- Emails con dominios comunes (gmail.com, hotmail.com, etc.)
- Roles aleatorios (student/teacher)
- Temas aleatorios (claro/oscuro)
- Contraseña por defecto: `123456`

## ⚠️ Notas Importantes

1. **Contraseñas**: Todos los usuarios se crean con la contraseña `123456`
2. **Emails únicos**: Los scripts verifican que no existan emails duplicados
3. **Limpieza**: Usa `--clear` para eliminar usuarios existentes antes de crear nuevos
4. **Transacciones**: Los seeders manejan errores y transacciones apropiadamente

## 🔧 Personalización

Para modificar los usuarios predefinidos, edita el archivo `seedUsers.js` en la sección `users`.

Para cambiar la generación aleatoria, modifica las constantes en `generateTestUsers.js`:
- `firstNames`: Lista de nombres
- `lastNames`: Lista de apellidos  
- `domains`: Dominios de email
- `roles`: Roles disponibles