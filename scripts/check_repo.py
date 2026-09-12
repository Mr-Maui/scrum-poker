"""Check essential scaffold files and local Markdown file links using only stdlib.

This deliberately checks file targets, not heading anchors or remote URLs.
It is a lightweight repository hygiene command, not an application test suite.
"""

from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = (
    "README.md",
    "AGENTS.md",
    "docs/product.md",
    "docs/architecture.md",
    "docs/development.md",
    "docs/decisions/README.md",
    "planning/README.md",
    "planning/templates/task.md",
    "planning/templates/adr.md",
    "planning/templates/merge-request.md",
    "apps/web/README.md",
    "services/api/README.md",
    "infra/README.md",
    "contracts/README.md",
    "tests/e2e/README.md",
)
LINK = re.compile(r"!?\[[^\]\n]*\]\(([^)\n]+)\)")


def main() -> int:
    errors = [f"Missing required file: {name}" for name in REQUIRED if not (ROOT / name).is_file()]
    documents = [ROOT / "README.md", ROOT / "AGENTS.md"]
    for directory in ("docs", "planning", "apps", "services", "infra", "contracts", "tests"):
        documents.extend((ROOT / directory).rglob("*.md"))

    checked = 0
    for document in sorted(set(documents)):
        if not document.is_file():
            continue
        # Exclude fenced examples: they may show placeholder link syntax.
        content = re.sub(r"```.*?```", "", document.read_text(encoding="utf-8"), flags=re.S)
        for match in LINK.finditer(content):
            target = match.group(1).strip()
            if target.startswith("<") and ">" in target:
                target = target[1:target.index(">")]
            else:
                target = target.split()[0]
            parsed = urlsplit(target)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            checked += 1
            if not (document.parent / unquote(parsed.path)).exists():
                errors.append(f"{document.relative_to(ROOT)}: broken file link {target}")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Repository check passed: {len(REQUIRED)} required files, {checked} local links.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
