"""Regression checks against a real public root removed after the CA incident."""

import runpy
from collections.abc import Callable
from pathlib import Path
from typing import cast

import certifi
import pytest


def bundle_checker() -> Callable[[str, str, set[str]], None]:
    module = runpy.run_path(str(Path(__file__).resolve().parents[2] / "scripts/check_trust.py"))
    return cast(Callable[[str, str, set[str]], None], module["check_bundle"])


def test_rejects_real_distrusted_root_even_in_a_valid_bundle() -> None:
    old_root = Path(__file__).with_name("fixtures").joinpath("emsign-ecc-g3.pem").read_text()
    bundle = Path(certifi.where()).read_text() + "\n" + old_root
    with pytest.raises(RuntimeError, match="distrusted CA remains"):
        bundle_checker()("regression", bundle, {"emSign ECC Root CA - G3"})


def test_accepts_patched_certificate_bundle() -> None:
    bundle_checker()("patched", Path(certifi.where()).read_text(), {"emSign ECC Root CA - G3"})
