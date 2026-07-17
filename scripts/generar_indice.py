import json
import re
from pathlib import Path
from urllib.parse import quote

RAIZ = Path(__file__).resolve().parents[1]
CARPETA = RAIZ / "constancias"
SALIDA = RAIZ / "data" / "constancias.json"


def nombre_visible(ruta: Path) -> str:
    nombre = re.sub(r"[_-]+", " ", ruta.stem)
    return re.sub(r"\s+", " ", nombre).strip()


archivos = sorted(
    (ruta for ruta in CARPETA.rglob("*") if ruta.is_file() and ruta.suffix.lower() == ".pdf"),
    key=lambda ruta: nombre_visible(ruta).casefold(),
)

indice = [
    {
        "nombre": nombre_visible(ruta),
        "archivo": "/".join(quote(parte) for parte in ruta.relative_to(RAIZ).parts),
    }
    for ruta in archivos
]

SALIDA.parent.mkdir(parents=True, exist_ok=True)
SALIDA.write_text(json.dumps(indice, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Índice generado: {len(indice)} constancias")
