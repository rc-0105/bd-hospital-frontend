# Sistema Médico · gestión hospitalaria

Frontend en Angular para la gestión integral de un hospital: 26 módulos CRUD
(pacientes, médicos, historias clínicas, citas, cirugías, facturación, seguros,
reclamos y más), organizados en un sidebar por área. Proyecto de la asignatura
de Bases de Datos.

## Stack

- Angular 19 (standalone components, SSR con hidratación, lazy loading por módulo)
- Angular Material + Bootstrap 5
- Interfaz con estilo minimalista inspirado en Notion: navbar y sidebar claros,
  tablas y tarjetas con bordes y sombras suaves, acento azul consistente

## Módulos

| Área | Entidades |
| --- | --- |
| Gestión médica | Pacientes, Médicos, Historias Clínicas, Diagnósticos, Antecedentes, Alergias |
| Servicios clínicos | Citas, Cirugías, Laboratorio, Prescripciones, Equipo Médico, Habitaciones |
| Administración | Empleados, Jornadas Laborales, Programas |
| Facturación | Facturas, Tipos de Factura, Conceptos |
| Seguros | Seguros de Salud, Pólizas |
| Reclamos | Reclamos, Tipos de Reclamo, Eventos Adversos |
| Configuración | Tipos de Área, Tipos de Documento, Jornadas por Día |

## Cómo ejecutarlo

Requisitos: Node 18+ y una API REST compatible corriendo en `http://localhost:8080`
(cada módulo expone su propio recurso, p. ej. `/paciente`, `/medico`, `/cita`).

```bash
npm install
npm start
```

Queda disponible en `http://localhost:4200` (no hay una ruta raíz definida;
entrá directamente a un módulo, por ejemplo `http://localhost:4200/pacientes`).

## Build de producción

```bash
npm run build
```

Las rutas con parámetro (`/editar/:id`) se renderizan en el cliente
(`RenderMode.Client`), ya que los datos vienen de la API en tiempo real y no
tiene sentido prerenderizarlas.
