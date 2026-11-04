"""Verify the runtime and bundled CA protections for the October 2026 incident.

Checks project-owned bundles only. Host OS/browser stores need separate updates;
see docs/security-updates.md. No connection to a hostile test endpoint is needed.
"""

import ensurepip
import json
import ssl
import subprocess
import sys
from importlib.metadata import version
from importlib.util import find_spec
from pathlib import Path
from typing import cast

import certifi


def require(condition: bool, message: str) -> None:
    if not condition:
        raise RuntimeError(message)


def release(value: str) -> tuple[int, ...]:
    return tuple(int(part) for part in value.lstrip("v").split("."))


def check_bundle(name: str, pem: str, blocked: set[str]) -> None:
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    context.load_verify_locations(cadata=pem)
    common_names = {
        value
        for certificate in context.get_ca_certs()
        for rdn in cast(tuple[tuple[tuple[str, str], ...], ...], certificate["subject"])
        for key, value in rdn
        if key == "commonName"
    }
    require(bool(common_names), f"{name}: empty CA bundle")
    require(not common_names.intersection(blocked), f"{name}: distrusted CA remains in bundle")
    print(f"{name}: distrusted roots absent ({len(common_names)} CAs checked)")


def package_bundle(package: str) -> str:
    spec = find_spec(package)
    if spec is None or spec.origin is None:
        raise RuntimeError(f"Missing certificate package: {package}")
    return Path(spec.origin).with_name("cacert.pem").read_text()


def main() -> None:
    require(sys.version_info[:2] == (3, 12), "Use this project's Python 3.12 runtime")
    require(sys.version_info[:3] >= (3, 12, 16), "Python must include the CA-key denylist")
    require(release(ensurepip.version()) >= (26, 2, 2), "Bundled pip is vulnerable")
    require(release(version("pip")) >= (26, 2, 2), "Installed pip is vulnerable")
    require(release(version("botocore")) >= (1, 43, 117), "botocore bundle predates the AWS fix")
    require(release(version("certifi")) >= (2026, 10, 19), "certifi bundle predates the fix")
    uv_version = subprocess.check_output(["uv", "--version"], text=True).split()[1]
    require(release(uv_version) >= (0, 13, 6), "Upgrade uv and its managed Python builds")

    emsign_ecc = {"emSign ECC Root CA - G3"}
    check_bundle("certifi", Path(certifi.where()).read_text(), emsign_ecc)
    check_bundle(
        "botocore",
        package_bundle("botocore"),
        emsign_ecc | {"AAA Certificate Services", "emSign Root TLS CA - G3"},
    )
    # pip vendors its own certifi; updating the separate certifi package is insufficient.
    check_bundle("pip vendored certifi", package_bundle("pip._vendor.certifi"), emsign_ecc)
    node = json.loads(
        subprocess.check_output(
            [
                "node",
                "--input-type=module",
                "-e",
                "import {rootCertificates} from 'node:tls';"
                "import {X509Certificate} from 'node:crypto';"
                "console.log(JSON.stringify({version:process.version,"
                "subjects:rootCertificates.map(pem=>new X509Certificate(pem).subject)}));",
            ],
            text=True,
        )
    )
    node_version = release(node["version"])
    require(node_version[:1] == (24,) and node_version >= (24, 22, 1), "Unpatched Node 24")
    require(bool(node["subjects"]), "Node root store is empty")
    require(
        not any("emSign ECC Root CA - G3" in subject for subject in node["subjects"]),
        "Node still trusts the distrusted emSign ECC root",
    )
    print("Runtime and bundled certificate checks passed")


if __name__ == "__main__":
    main()
