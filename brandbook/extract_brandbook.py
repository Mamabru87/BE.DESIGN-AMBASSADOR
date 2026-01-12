from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


def normalize_text(s: str) -> str:
    # Keep original wording, just normalize whitespace for easier mapping.
    s = s.replace("\u00a0", " ")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    pdf_path = repo_root / "BE_Projects_Achievements.pdf"
    out_dir = repo_root / "brandbook"
    out_dir.mkdir(parents=True, exist_ok=True)

    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    reader = PdfReader(str(pdf_path))

    pages: list[dict[str, object]] = []
    full_text_parts: list[str] = []

    for i, page in enumerate(reader.pages, start=1):
        raw = page.extract_text() or ""
        norm = normalize_text(raw)
        pages.append({"page": i, "text": norm})
        if norm:
            full_text_parts.append(f"\n\n--- PAGE {i} ---\n\n{norm}")

    full_text = "".join(full_text_parts).strip()

    json_path = out_dir / "BE_Projects_Achievements.text.json"
    txt_path = out_dir / "BE_Projects_Achievements.text.txt"

    json_path.write_text(json.dumps({"pdf": pdf_path.name, "pages": pages}, ensure_ascii=False, indent=2), encoding="utf-8")
    txt_path.write_text(full_text, encoding="utf-8")

    print(f"Wrote: {json_path}")
    print(f"Wrote: {txt_path}")
    print(f"Pages: {len(pages)}")
    print(f"Chars: {len(full_text)}")


if __name__ == "__main__":
    main()
