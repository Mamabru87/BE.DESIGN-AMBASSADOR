from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

from pdfminer.high_level import extract_pages
from pdfminer.layout import LTChar, LTTextContainer


def iter_chars(obj):
    """Yield LTChar objects recursively from a pdfminer layout tree."""
    if isinstance(obj, LTChar):
        yield obj
        return

    # Most layout objects expose children under `_objs`.
    children = getattr(obj, "_objs", None)
    if not children:
        return
    for child in children:
        yield from iter_chars(child)


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    pdf_path = repo_root / "BE_Projects_Achievements.pdf"
    out_dir = repo_root / "brandbook"
    out_dir.mkdir(parents=True, exist_ok=True)

    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    fonts: Counter[str] = Counter()
    sizes: Counter[float] = Counter()

    for page_layout in extract_pages(str(pdf_path)):
        for element in page_layout:
            if not isinstance(element, LTTextContainer):
                continue
            for char in iter_chars(element):
                fonts[char.fontname] += 1
                sizes[round(char.size, 2)] += 1

    out = {
        "pdf": pdf_path.name,
        "fonts": fonts.most_common(),
        "sizes": sizes.most_common(),
    }

    out_path = out_dir / "BE_Projects_Achievements.fonts.json"
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Wrote: {out_path}")
    print(f"Unique fonts: {len(fonts)}")
    print(f"Unique sizes: {len(sizes)}")


if __name__ == "__main__":
    main()
