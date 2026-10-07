# Gestión de Medidores

API REST para registrar medidores de energía y sus lecturas de consumo.
Proyecto personal para practicar arquitectura en capas, migraciones y buenas prácticas de APIs con NestJS.

## Tecnologías

- Node.js y NestJS
- PostgreSQL con TypeORM y migraciones
- Validación con class-validator
- Pruebas con Jest
- Integración continua con GitHub Actions

## Qué incluye

- Arquitectura en capas: controlador, servicio y repositorio, organizada en módulos (`users`, `meters`, `readings`).
- Inyección de dependencias entre módulos.
- Entidades con relación uno a muchos: un medidor tiene muchas lecturas.
- Migraciones versionadas del esquema de la base de datos.
- Versionamiento por URI (`/v1/`).
- Paginación en los listados (`?page=1&limit=10`).
- Validación de datos de entrada con DTOs.
- Manejo de errores uniforme con un filtro global de excepciones.
- Pruebas unitarias de los servicios con dobles de prueba.
- Pipeline de CI que compila y ejecuta las pruebas en cada pull request.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/v1/meters?page=1&limit=10` | Lista medidores con paginación |
| GET | `/v1/meters/:id` | Obtiene un medidor |
| POST | `/v1/meters` | Crea un medidor |
| GET | `/v1/readings/meter/:meterId` | Lista las lecturas de un medidor |
| POST | `/v1/readings` | Registra una lectura |

### Códigos de respuesta

- `201` recurso creado
- `400` datos inválidos
- `404` el recurso no existe
- `409` conflicto, por ejemplo un serial duplicado

Los errores tienen siempre la misma forma:

```json
{
  "statusCode": 404,
  "message": "El medidor 99 no existe",
  "path": "/v1/meters/99",
  "timestamp": "2026-10-07T20:22:43.237Z"
}
```

## Cómo ejecutarlo

Requisitos: Node.js y PostgreSQL.

1. Instalar dependencias:
```bash
   npm install
```
2. Crear la base de datos `medidores_db` en PostgreSQL.
3. Crear un archivo `.env` en la raíz con:
```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_NAME=medidores_db
```
4. Ejecutar las migraciones:
```bash
   npm run migration:run
```
5. Iniciar el servidor:
```bash
   npm run start:dev
```
   La API queda en `http://localhost:3000/v1`.

## Pruebas

```bash
npm test
```

## Autora

Ruby Yuliana Peñaranda Hernández
[github.com/rubyuliana28](https://github.com/rubyuliana28)