# Team Directory

App React local para un worktrial de contratación de QA.

## Cómo correrla

```bash
pnpm install
pnpm dev
```

Abrí la URL que imprime Vite (suele ser http://localhost:5173).

## Material para el candidato

- La app (corriendo)
- `CANDIDATE_BRIEF.md`

Los candidatos **no** deben recibir `EVALUATOR_KEY.md`.

## Reset de datos

En la consola del navegador, en el origin de la app:

```js
localStorage.removeItem("team-directory-v1");
location.reload();
```

## Scripts

- `pnpm test` — tests unitarios de storage
- `pnpm build` — build de producción
