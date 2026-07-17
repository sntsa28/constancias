# Buscador de constancias

## Publicación

1. Sube todo el contenido de este proyecto a la rama `main` de tu repositorio.
2. Coloca los PDF dentro de la carpeta `constancias`. Se admiten subcarpetas.
3. En GitHub abre **Settings → Actions → General → Workflow permissions** y selecciona **Read and write permissions**.
4. Abre **Settings → Pages**. En **Build and deployment** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
5. Espera a que termine la acción **Actualizar índice de constancias**.

Cada vez que agregues, elimines o renombres PDF, GitHub actualizará automáticamente `data/constancias.json`.

El nombre mostrado se obtiene del nombre del PDF. Los guiones y guiones bajos se convierten en espacios. Ejemplo:

`JORGE_ALFREDO_HERNANDEZ_RIZO.pdf` → `JORGE ALFREDO HERNANDEZ RIZO`

## Aviso de privacidad

En un repositorio público, cualquier persona puede acceder a los nombres y PDF. Este buscador no funciona como control de acceso.
