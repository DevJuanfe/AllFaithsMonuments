"""Freeze the approved HTML study as React-rendered markup and unchanged assets.

Run only when the owner approves a new reference. This rewrites the initial gallery
manifest; new gallery entries should normally be added to
src/features/gallery/data/photos.json.
"""

from __future__ import annotations

import base64
import hashlib
import html
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REFERENCE = ROOT / "docs/referencias"
PUBLIC = ROOT / "public/assets"
ROUTES = {
    "home": REFERENCE / "All_Faiths_Monuments_Editorial_Desktop.html",
    **{
        route: REFERENCE / route / "index.html"
        for route in ("about", "contact", "engraving", "gallery", "granite-colors", "guidance")
    },
}


def replace_once(value: str, pattern: str, replacement: str, *, flags: int = 0) -> str:
    result, count = re.subn(pattern, replacement, value, count=1, flags=flags)
    if count != 1:
        raise ValueError(f"Expected one occurrence of {pattern!r}; found {count}")
    return result


def extract_data_uri(body: str, attribute: str, mime: str, target: Path) -> tuple[str, str]:
    pattern = rf'{attribute}="data:{mime};base64,([^"]+)"'
    match = re.search(pattern, body)
    if not match:
        raise ValueError(f"Missing {mime} {attribute}")
    raw = base64.b64decode(match.group(1), validate=True)
    target.write_bytes(raw)
    digest = hashlib.sha256(raw).hexdigest()
    return body.replace(match.group(0), f'{attribute}="/assets/{target.name}"', 1), digest


def gallery_manifest(body: str) -> list[dict[str, object]]:
    photos = []
    for card in re.findall(r'<figure class="collection-card">.*?</figure>', body, re.S):
        image = re.search(r'<img\s+([^>]+)>', card)
        if image is None:
            raise ValueError("Gallery card without image")
        attributes = dict(re.findall(r'([\w-]+)="([^"]*)"', image.group(1)))
        captions = dict(
            (language, html.unescape(text))
            for language, text in re.findall(r'<span class="gallery-(en|es)"(?: lang="es")?>(.*?)</span>', card)
        )
        src = attributes["src"].replace("../assets/", "/assets/")
        photos.append(
            {
                "id": Path(src).stem,
                "src": src,
                "width": int(attributes["width"]),
                "height": int(attributes["height"]),
                "altEn": html.unescape(attributes["alt"]),
                "altEs": html.unescape(attributes["data-alt-es"]),
                "captionEn": captions["en"],
                "captionEs": captions["es"],
            }
        )
    if len(photos) != 19:
        raise ValueError(f"Expected 19 approved photos; found {len(photos)}")
    return photos


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    shutil.copytree(REFERENCE / "assets/img", PUBLIC / "img", dirs_exist_ok=True)
    shutil.copy2(REFERENCE / "assets/site.css", PUBLIC / "site.css")
    shutil.copy2(REFERENCE / "assets/gallery.css", PUBLIC / "gallery.css")
    bodies: dict[str, str] = {}
    hashes: dict[str, str] = {}
    route_manifest: list[dict[str, str]] = []
    home_head = ""

    for route, source in ROUTES.items():
        document = source.read_text(encoding="utf-8")
        head = document.split("<head>", 1)[1].split("</head>", 1)[0]
        title = re.search(r"<title>(.*?)</title>", head)
        if title is None:
            raise ValueError(f"Missing page title in {source}")
        route_manifest.append({"name": route, "path": "/" if route == "home" else f"/{route}/", "title": html.unescape(title.group(1))})
        body = document.split("<body>", 1)[1].split("</body>", 1)[0]
        body = re.sub(r'<script src="[^"]+"></script>', "", body)
        body = body.replace('../assets/img/', '/assets/img/').replace('assets/img/', '/assets/img/')
        body = body.replace('//assets/img/', '/assets/img/')
        body = body.replace('../All_Faiths_Monuments_Editorial_Desktop.html', '/')
        for page in ROUTES:
            if page == "home":
                continue
            body = body.replace(f'../{page}/index.html', f'/{page}/')
            body = body.replace(f'{page}/index.html', f'/{page}/')
        if route == "home":
            body, hashes["sky-film.mp4"] = extract_data_uri(body, "src", "video/mp4", PUBLIC / "sky-film.mp4")
            body, hashes["sky-poster.jpg"] = extract_data_uri(body, "poster", "image/jpeg", PUBLIC / "sky-poster.jpg")
        if route == "gallery":
            gallery = gallery_manifest(body)
            manifest = ROOT / "src/features/gallery/data/photos.json"
            manifest.parent.mkdir(parents=True, exist_ok=True)
            manifest.write_text(json.dumps(gallery, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            body = replace_once(
                body,
                r'<span><span class="gallery-en">19 photographs · Select a photo to enlarge</span><span class="gallery-es" lang="es">19 fotografías · Selecciona una para ampliarla</span></span>',
                '<span data-gallery-count></span>',
            )
            body = replace_once(body, r'<div class="memorial-collection">.*?</div>', '<div class="memorial-collection"></div>', flags=re.S)
            body = replace_once(body, r'<dialog class="photo-viewer".*?</dialog>', '<dialog class="photo-viewer" data-gallery-viewer></dialog>', flags=re.S)
        if route == "contact":
            body = replace_once(body, r'<form id="inquiryForm".*?</form>', '<form id="inquiryForm" data-contact-form></form>', flags=re.S)
        bodies[route] = body.strip()

        if route == "home":
            home_head = head.replace('href="assets/site.css"', 'href="/assets/site.css"')

    home_head = home_head.replace('</head>', '')
    home_head += '\n<link rel="stylesheet" href="/assets/gallery.css">'
    (ROOT / "index.html").write_text(
        '<!DOCTYPE html>\n<html lang="en"><head>' + home_head + '</head><body>'
        '<div id="root"></div><script type="module" src="/src/app/main.tsx"></script>'
        '</body></html>\n',
        encoding="utf-8",
    )
    (ROOT / "src/app/routeManifest.json").write_text(
        json.dumps(route_manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    (ROOT / "src/app/reference/frozenPages.ts").write_text(
        "// Generated from the owner-approved HTML reference. Do not edit for design changes.\n"
        "export const frozenPages: Record<string, string> = "
        + json.dumps(bodies, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    site_js = (REFERENCE / "assets/site.js").read_text(encoding="utf-8")
    dictionary = site_js.split("const translations=", 1)[1].split("let language='en';", 1)[0]
    dictionary = "export const translations: Record<Language, Record<string, string>>=" + dictionary
    mappings = site_js.split("const spanishTitles=", 1)[1].split("const englishAriaLabels=", 1)[0]
    mappings = "export const spanishTitles: Record<string, string>=" + mappings
    mappings = mappings.replace("const spanishAriaLabels=", "export const spanishAriaLabels: Record<string, string>=")
    mappings = mappings.replace("const spanishAltText=", "export const spanishAltText: Record<string, string>=")
    (ROOT / "src/shared/i18n/translations.ts").write_text(
        "// Copied from the frozen reference translation dictionary.\n"
        "export type Language = 'en' | 'es';\n" + dictionary + mappings,
        encoding="utf-8",
    )
    (ROOT / "docs/decisiones/react-assets.json").write_text(
        json.dumps(hashes, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Imported {len(bodies)} routes, {len(gallery)} gallery photos, and unchanged video/poster bytes")


if __name__ == "__main__":
    main()
