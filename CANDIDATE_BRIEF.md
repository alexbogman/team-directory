# Team Directory — Brief de QA (worktrial)

## Producto

**Team Directory** es una app web chica para explorar y administrar el roster de miembros del equipo. Los datos se guardan solo en tu navegador (no hay servidor).

## Tu objetivo

Usando este brief como fuente de verdad:

1. **Escribí casos de prueba** que cubran los criterios de aceptación de abajo.
2. **Explorá la app en ejecución** y ejecutá tus pruebas (y exploración ad hoc).
3. **Registrá cualquier bug** que encuentres en un archivo `.txt` plano (tu contacto de hiring te va a indicar cómo entregarlo).

**Timebox:** 2–3 horas.

## Criterios de aceptación

### Lista del directorio

- La home muestra una **tabla** de miembros con columnas: **Name**, **Email**, **Role**, **Department** y **Status**.
- Al hacer clic en el **name** de un miembro se abre su página de detalle.
- Un control **Add member** navega al formulario de alta.
- Un contador o resumen refleja cuántos miembros están **visibles actualmente** (después de aplicar búsqueda/filtros).
- Cuando ningún miembro coincide con la búsqueda/filtros actuales, la UI muestra un **empty state** claro (no un error genérico de carga).

### Búsqueda

- La búsqueda matchea **name** y **email**.
- El match es **case-insensitive** (ej. `ava` encuentra `Ava Chen`).
- La query de búsqueda se **trimea** antes de matchear (espacios al inicio/final no deberían impedir un match).

### Filtros

- Filtro de **Status**: All, Active o Inactive.
- Filtro de **Department**: All, o uno de Engineering, Product, Operations, People.
- Búsqueda y filtros se **combinan con lógica AND** (una fila debe cumplir búsqueda **y** status **y** department cuando esos están seteados).

### Crear miembro

- Campos del formulario: name, email, role, department, status.
- **Name** es obligatorio (no se puede guardar vacío).
- **Email** debe ser una dirección de email válida (debe incluir `@` y ser razonable para un email de trabajo).
- **Role**, **department** y **status** son obligatorios / deben estar seteados.
- Al guardar con éxito, volvés al directorio y ves el **nuevo miembro** en la lista.

### Editar miembro

- Mismos campos y validación que en create.
- **Save** actualiza el miembro en todos lados (lista y detalle).
- **Cancel** deja los datos sin cambios y no guarda.

### Detalle del miembro

- Vista de solo lectura de name, email, role, department y status.
- Acciones de **Edit**, **Deactivate** y **Delete**.

### Deactivate

- Requiere un diálogo de **confirmación**.
- **Cancel** cierra el diálogo y deja al miembro **sin cambios**.
- **Confirm** pone el status en **Inactive**; el miembro **sigue** en el directorio (no se borra).

### Delete

- Requiere un diálogo de **confirmación**.
- **Cancel** cierra el diálogo y deja al miembro **sin cambios**.
- **Confirm** **elimina de forma permanente** al miembro del directorio.

### Persistencia

- Los cambios de create, edit, deactivate y delete **persisten después de un refresh completo** del navegador (mismo origin).

### Datos seed

- En la **primera carga** (storage del navegador limpio para esta app), el directorio viene **pre-poblado** con varios miembros para que búsqueda y filtros tengan sentido de inmediato.

## Plantilla opcional de bug report

Podés estructurar cada bug en tu `.txt` así:

```
Title:
Severity: (ej. Critical / High / Medium / Low)
Steps to reproduce:
1.
2.
Expected:
Actual:
```
