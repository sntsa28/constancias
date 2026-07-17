const formulario = document.querySelector('#formulario');
const campo = document.querySelector('#nombre');
const estado = document.querySelector('#estado');
const contenedor = document.querySelector('#resultados');
let constancias = [];

const normalizar = texto => texto
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es-MX')
  .trim();

async function cargarIndice() {
  try {
    const respuesta = await fetch(`data/constancias.json?v=${Date.now()}`);
    if (!respuesta.ok) throw new Error('No se pudo leer el índice');
    constancias = await respuesta.json();
    estado.textContent = `${constancias.length.toLocaleString('es-MX')} constancias disponibles.`;
  } catch (error) {
    estado.textContent = 'No fue posible cargar las constancias. Intenta más tarde.';
    console.error(error);
  }
}

formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  contenedor.replaceChildren();

  const consulta = normalizar(campo.value);
  if (consulta.length < 3) {
    estado.textContent = 'Escribe por lo menos 3 caracteres.';
    return;
  }

  const palabras = consulta.split(/\s+/).filter(Boolean);
  const coincidencias = constancias
    .filter(item => palabras.every(palabra => normalizar(item.nombre).includes(palabra)))
    .slice(0, 30);

  estado.textContent = coincidencias.length
    ? `${coincidencias.length} resultado(s).`
    : 'No se encontraron constancias con ese nombre.';

  coincidencias.forEach(item => {
    const fila = document.createElement('article');
    fila.className = 'resultado';

    const nombre = document.createElement('strong');
    nombre.textContent = item.nombre;

    const enlace = document.createElement('a');
    enlace.className = 'boton';
    enlace.href = item.archivo;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.textContent = 'Ver / descargar';

    fila.append(nombre, enlace);
    contenedor.append(fila);
  });
});

cargarIndice();
