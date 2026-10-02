"""Genera index.html y admin.html incrustando el logo y el favicon oficiales
(assets/brand/) en las plantillas *.src.html. Correr después de editar una plantilla:
    python3 build.py
"""
import base64
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent
MARCA = AQUI.parent / "assets" / "brand"
RUTA = re.compile(r'<path d="([^"]+)" style="fill:(#[0-9a-fA-F]+);"/>')
DORADOS = {"#dbc640", "#dfc841", "#e0c842"}


def logo():
    # Recorte del lienzo A4 del manual al área del logotipo (bbox medido en Chrome)
    x, y, w, h, pad = 236, 2155, 3036, 651, 20
    rutas = []
    for d, color in RUTA.findall((MARCA / "logo-positivo.svg").read_text()):
        c = color.lower()
        clase = "ld" if c in DORADOS else "lc" if c == "#fcfcfa" else "lv"
        rutas.append(f'<path class="{clase}" fill="{color}" d="{d}"/>')
    return (f'<svg class="logo" viewBox="{x - pad} {y - pad} {w + 2 * pad} {h + 2 * pad}" role="img" '
            f'aria-label="AgriVision" xmlns="http://www.w3.org/2000/svg">{"".join(rutas)}</svg>')


def favicon():
    rutas = "".join(f'<path d="{d}" fill="{c}"/>' for d, c in RUTA.findall((MARCA / "isotipo-positivo.svg").read_text()))
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="788 786 1931 3389">{rutas}</svg>'
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()


if __name__ == "__main__":
    reemplazos = {"%%LOGO%%": logo(), "%%FAVICON%%": favicon()}
    for src in AQUI.glob("*.src.html"):
        html = src.read_text()
        for k, v in reemplazos.items():
            html = html.replace(k, v)
        destino = src.with_name(src.name.replace(".src", ""))
        destino.write_text(html)
        print("generado", destino.name)
