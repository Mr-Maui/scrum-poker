#!/usr/bin/env bash
# Shared local/CI checks. Run from any directory in the checkout.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
uv run --frozen ruff check .
uv run --frozen ruff format --check .
uv run --frozen mypy
uv run --frozen pytest
uv run --frozen python scripts/check_repo.py
uv run --frozen python scripts/check_trust.py
npm run infra:synth
